import { useParams } from 'react-router-dom'
import { CircularProgress, LinearProgress, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import axios from 'axios'
import { FC, useEffect, useState } from 'react'
import { Stats } from '@/components/stats/Stats'
import { PokemonType as Type, TYPE_COLORS } from '@/components/pokemon-type/PokemonType'
import { Ability } from '@/components/stats/stats.interface'

interface PokemonData {
    name: string
    sprites: {
        front_default: string
        back_default: string
    }
    types: {
        type: {
            name: string
        }
    }[]
    stats: {
        base_stat: number
        stat: {
            name: string
        }
    }[]
    weight: number
    height: number
    abilities: Ability[]
}

export const PokemonDetail: FC = () => {
    const theme = useTheme()
    const { id } = useParams()
    const [data, setData] = useState<PokemonData>()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error>()

    const [imgDir, setImgDir] = useState(0) // 0 front, 1 back

    useEffect(() => {
        if (id) {
            ;(async function () {
                try {
                    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
                    setData(response.data)
                } catch (err) {
                    setError(err as Error)
                } finally {
                    setLoading(false)
                }
            })()
        }
    }, [id])

    const downLg = useMediaQuery(theme.breakpoints.down('lg'))

    if (error) return <p>Error...</p>

    return (
        <Stack width="max(80%, 400px)" margin="auto" alignItems="center" gap={3} p={3}>
            {loading || !data ? (
                <CircularProgress color="secondary" />
            ) : (
                <>
                    <Stack justifyContent="center" alignItems="center" direction="row" gap={2}>
                        <Typography variant="h3">
                            {data.name.substring(0, 1).toUpperCase() + data.name.substring(1, data.name.length)}
                        </Typography>
                        <Typography variant="h3" color="#a8a8a8">{`#${id?.padStart(4, '0')}`}</Typography>
                    </Stack>
                    <Stack
                        direction={downLg ? 'column' : 'row'}
                        alignItems="center"
                        width="100%"
                        justifyContent="space-around"
                    >
                        <Stack alignItems="center">
                            <img
                                src={imgDir === 0 ? data?.sprites.front_default : data?.sprites.back_default}
                                alt=""
                                width={420}
                                height={420}
                                onMouseOver={() => setImgDir(1)}
                                onMouseLeave={() => setImgDir(0)}
                            ></img>
                            <Stack direction="row" gap={2} flexWrap="wrap">
                                {data?.types.map((x, index) => (
                                    <Type key={index} type={x.type.name as keyof typeof TYPE_COLORS} />
                                ))}
                            </Stack>
                        </Stack>
                        <Stack width="100%" maxWidth={700} gap={3}>
                            <Stats weight={data.weight / 10} height={data.height / 10} abilities={data.abilities} />
                            <Stack gap={1.5}>
                                {data.stats.map((x, i: number) => (
                                    <div key={i}>
                                        <Typography variant="h6">{x.stat.name.toUpperCase()}</Typography>
                                        <LinearProgress
                                            variant="determinate"
                                            value={(x.base_stat * 100) / 255}
                                            sx={{ borderRadius: 10, height: '10px' }}
                                            color="secondary"
                                        />
                                    </div>
                                ))}
                            </Stack>
                        </Stack>
                    </Stack>
                </>
            )}
        </Stack>
    )
}
