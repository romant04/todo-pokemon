import { FC, useEffect, useState } from 'react'
import { Stack, Typography, useTheme } from '@mui/material'
import { Link } from 'react-router-dom'

interface Props {
    img: string
    name: string
    id: number
}

export const PokemonCard: FC<Props> = ({ img, name, id }: Props) => {
    const theme = useTheme()
    const [code, setCode] = useState<string>()

    useEffect(() => {
        for (let i = id; i >= 0; i--) {
            setCode(`#${id.toString().padStart(4, '0')}`)
        }
    }, [id])

    return (
        <div>
            <Link to={`./detail/${id}`}>
                <Stack
                    width="100%"
                    height={280}
                    borderRadius={3}
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        background: theme.palette.primary.dark,
                        cursor: 'pointer',
                        ':hover': {
                            background: theme.palette.primary.main,
                        },
                    }}
                >
                    <img width={250} height={250} src={img} alt=""></img>
                </Stack>
            </Link>
            <Typography variant="h5">{name.substring(0, 1).toUpperCase() + name.substring(1, name.length)}</Typography>
            <Typography variant="body1">{code}</Typography>
        </div>
    )
}
