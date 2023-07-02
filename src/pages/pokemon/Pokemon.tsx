import { ChangeEvent, FC, useEffect, useState } from 'react'
import { CircularProgress, Grid, Pagination, Stack } from '@mui/material'
import { PokemonCard } from '@/components/pokemon-card/PokemonCard'
import usePokemonNames from '@/hooks/usePokemonNames'
import axios from 'axios'
import { setCurrPage } from '@/redux/pageSlice'
import { useAppDispatch, useAppSelector } from '@/redux/store'

const PAGE_SIZE = 20

interface PokemonData {
    name: string
    img: string
    id: number
}

interface PokemonDataSource {
    data: {
        name: string
        id: number
        sprites: {
            front_default: string
        }
    }
}

export const Pokemon: FC = () => {
    const dispatch = useAppDispatch()

    const [pokemons, setPokemons] = useState<PokemonData[]>([])
    const { data: names, loading: namesLoading, error: namesError } = usePokemonNames()
    const [data, setData] = useState<PokemonDataSource[]>()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error>()
    const [contentLoading, setContentLoading] = useState(true)

    const savedPage = useAppSelector((state) => state.page.value)

    const [page, setPage] = useState(savedPage ? savedPage : 1)
    const [maxPage, setMaxPage] = useState(Math.ceil(names.length / PAGE_SIZE))

    function onPageChange(e: ChangeEvent<unknown>, value: number) {
        setPokemons([])
        setPage(value)
        dispatch(setCurrPage(value))
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 100)
    }

    useEffect(() => {
        if (names) {
            ;(async function () {
                try {
                    const fetchData = []
                    for (const i of names.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)) {
                        fetchData.push(i.url)
                    }
                    setMaxPage(Math.ceil(names.length / PAGE_SIZE))

                    const res: unknown = await axios.all(fetchData.map((endpoint) => axios.get(endpoint)))
                    setData(res as PokemonDataSource[])
                } catch (err) {
                    setError(err as Error)
                } finally {
                    setLoading(false)
                }
            })()
        }
    }, [names, page])

    useEffect(() => {
        if (!loading && !error) {
            if (data) {
                setPokemons([])
                data.map((f) => {
                    setPokemons((prev) => [
                        ...prev,
                        {
                            name: f.data.name,
                            img: f.data.sprites.front_default,
                            id: f.data.id,
                        },
                    ])
                })
            }
        }
    }, [data, loading, error])

    useEffect(() => {
        if (pokemons.length > 0) {
            setContentLoading(false)
        } else {
            setContentLoading(true)
        }
    }, [pokemons])

    if (error || namesError) return <p>Error...</p>

    return (
        <Stack justifyContent="center" alignItems="center" gap={5} width="min(100%, 1280px)" margin="auto" p={5}>
            {loading || namesLoading || contentLoading ? (
                <CircularProgress color="secondary" />
            ) : (
                <>
                    <Grid
                        display="grid"
                        gap={3}
                        gridTemplateColumns="repeat(auto-fill, minmax(280px, 1fr))"
                        margin="auto"
                        width="100%"
                    >
                        {pokemons.map((f) => (
                            <PokemonCard key={f.id} img={f.img} name={f.name} id={f.id} />
                        ))}
                    </Grid>
                    <Pagination color="secondary" count={maxPage} page={page} onChange={onPageChange} />
                </>
            )}
        </Stack>
    )
}
