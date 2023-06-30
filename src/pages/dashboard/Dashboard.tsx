import { Box, Divider, Stack, Typography, useTheme } from '@mui/material'
import { TodoForm } from '@/components/todo-form/TodoForm'
import { Todo } from '@/components/todo/Todo'

export const Dashboard = () => {
    const theme = useTheme()

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Stack sx={{ background: '#F4F4F4', borderRadius: 2 }}>
                <Box sx={{ background: '#363636', borderRadius: '8px 8px 0 0', color: 'white' }} py={1} px={2}>
                    <Typography variant="h4">Todos (5)</Typography>
                </Box>
                <Stack p={1}>
                    <Box p={3}>
                        <TodoForm />
                    </Box>
                    <Divider variant="middle" color={theme.palette.primary.main} sx={{ m: 2 }} />
                    <Stack p={3} display="flex" gap={2} sx={{ maxHeight: '400px', overflow: 'auto' }}>
                        <Todo />
                        <Todo />
                        <Todo />
                        <Todo />
                        <Todo />
                        <Todo />
                        <Todo />
                        <Todo />
                        <Todo />
                        <Todo />
                        <Todo />
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    )
}
