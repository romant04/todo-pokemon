import { FC } from 'react'
import { Box, Stack, Typography, useTheme } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { TodoRecord } from '@/components/todo/todo.interface'

export const Todo: FC<TodoRecord> = ({ id, name, description, date }: TodoRecord) => {
    const theme = useTheme()

    return (
        <Stack
            sx={{ background: theme.palette.primary.dark, borderRadius: 2 }}
            p={2}
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="flex-start"
        >
            <Stack>
                <Typography variant="h6" fontWeight="bold" color="#FFFFFF">
                    {name}
                </Typography>
                <Typography variant="body1" color="#E1E1E1" sx={{ maxWidth: '250px' }}>
                    {description}
                </Typography>
                <Typography variant="body2" color="white" sx={{ mt: 1.5 }}>
                    {date.toDate().toLocaleDateString()}
                </Typography>
            </Stack>
            <Stack gap={2}>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        borderRadius: '100%',
                        padding: 0,
                        width: 35,
                        height: 35,
                        background: theme.palette.error.main,
                        color: 'white',
                        cursor: 'pointer',
                        '&:hover': { background: theme.palette.error.light },
                    }}
                >
                    <FontAwesomeIcon icon={faTrash} />{' '}
                </Box>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        borderRadius: '100%',
                        padding: 0,
                        width: 35,
                        height: 35,
                        background: theme.palette.info.main,
                        color: 'white',
                        cursor: 'pointer',
                        '&:hover': { background: theme.palette.info.light },
                    }}
                >
                    <FontAwesomeIcon icon={faPenToSquare} />{' '}
                </Box>
            </Stack>
        </Stack>
    )
}
