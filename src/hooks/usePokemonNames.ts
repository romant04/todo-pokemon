import { useEffect, useState } from 'react'
import axios from 'axios'

interface PokemonNames {
    name: string
    url: string
}

export default function usePokemonNames() {
    const [data, setData] = useState<PokemonNames[]>([])
    const [error, setError] = useState<Error>()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        ;(async function () {
            try {
                setLoading(true)
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000')
                setData(response.data.results)
            } catch (err) {
                setError(err as Error)
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    return { data, error, loading }
}
