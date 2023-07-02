import { FC } from 'react'
import { Grid, Stack, Typography, useTheme } from '@mui/material'
import { Ability } from '@/components/stats/stats.interface'

interface Props {
    weight: number
    height: number
    abilities: Ability[]
}

export const Stats: FC<Props> = ({ weight, height, abilities }: Props) => {
    const theme = useTheme()

    return (
        <Grid
            sx={{ background: theme.palette.primary.dark }}
            maxHeight={300}
            width="100%"
            py={3}
            mt={4}
            borderRadius={3}
            display="grid"
            gridTemplateColumns="1fr 1fr"
        >
            <Stack gap={3} alignItems="center">
                <Stack>
                    <Typography variant="h4" sx={{ color: 'white' }}>
                        Weight
                    </Typography>
                    <Typography variant="h5" sx={{ color: '#DADADA' }}>
                        {weight} kg
                    </Typography>
                </Stack>
                <Stack>
                    <Typography variant="h4" sx={{ color: 'white' }}>
                        Height
                    </Typography>
                    <Typography variant="h5" sx={{ color: '#DADADA' }}>
                        {height} m
                    </Typography>
                </Stack>
            </Stack>
            <Stack alignItems="center">
                <Stack alignItems="flex-start">
                    <Typography variant="h4" sx={{ color: 'white' }}>
                        Abilities
                    </Typography>
                    {abilities.map((x, i) => (
                        <Typography variant="h5" key={i} sx={{ color: '#DADADA' }}>
                            {x.ability.name}
                        </Typography>
                    ))}
                </Stack>
            </Stack>
        </Grid>
    )
}
