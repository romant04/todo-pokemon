import { IRoute } from '@/router/routes/routePublic'
import { Pokemon } from '@/pages/pokemon/Pokemon'
import { PokemonDetail } from '@/pages/pokemon/detail/PokemonDetail'

export const routePokemons: IRoute[] = [
    { path: '/pokemon', element: Pokemon },
    {
        path: '/pokemon/detail/:id',
        element: PokemonDetail,
    },
]
