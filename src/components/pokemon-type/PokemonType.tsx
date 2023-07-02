import { FC } from 'react'
import { Stack } from '@mui/material'

export const TYPE_COLORS = {
    normal: '#d3d3d3',
    fighting: '#854700',
    flying: '#add8e6',
    poison: '#800080',
    ground: '#643e13',
    rock: '#808080',
    bug: '#86d186',
    ghost: '#53005e',
    steel: '#c4c4c4',
    fire: '#ad0d0d',
    water: '#1e14ac',
    grass: '#008000',
    electric: '#d6d60c',
    psychic: '#810e85',
    ice: '#a1e5fc',
    dragon: '#a56012',
    dark: '#353535',
    fairy: '#ffc0cb',
    unknown: '',
    shadow: '#31163b',
}

interface Props {
    type: keyof typeof TYPE_COLORS
}

function hex_is_light(color: string) {
    const hex = color.replace('#', '')
    const c_r = parseInt(hex.substring(0, 2), 16)
    const c_g = parseInt(hex.substring(2, 4), 16)
    const c_b = parseInt(hex.substring(4, 6), 16)
    const brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000
    return brightness > 155
}

export const PokemonType: FC<Props> = ({ type }: Props) => {
    return (
        <Stack
            sx={{
                background: TYPE_COLORS[type],
                paddingBlock: 1.5,
                paddingInline: 2.5,
                borderRadius: 1,
                color: hex_is_light(TYPE_COLORS[type].toString()) ? 'black' : 'white',
            }}
        >
            {type}
        </Stack>
    )
}
