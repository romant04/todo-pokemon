import { Box, Divider, Stack, Typography, useTheme } from '@mui/material'
import { TodoForm } from '@/components/todo-form/TodoForm'
import { Todo } from '@/components/todo/Todo'
import * as todo from '@/services/db/repositories/todo'
import { useEffect, useState } from 'react'
import { TodoRecord } from '@/components/todo/todo.interface'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { RootState } from '@/redux/rootReducer'
import { initTodos } from '@/redux/todoSlice'

export const Dashboard = () => {
    const dispatch = useAppDispatch()
    const theme = useTheme()
    const [todos, setTodos] = useState<TodoRecord[]>([])

    const storedTodos = useAppSelector((state: RootState) => state.todos.todos)

    useEffect(() => {
        setTodos(storedTodos)
    }, [storedTodos])

    useEffect(() => {
        const fetchTodos = async () => {
            const allTodos: unknown = await todo.all()
            dispatch(initTodos(allTodos as TodoRecord[]))
        }
        void fetchTodos()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
            <Stack sx={{ background: '#F4F4F4', borderRadius: 2 }} width="max(50%, 500px)">
                <Box sx={{ background: '#363636', borderRadius: '8px 8px 0 0', color: 'white' }} py={1} px={2}>
                    <Typography variant="h4">Todos ({todos.length})</Typography>
                </Box>
                <Stack p={1}>
                    <Box p={3}>
                        <TodoForm />
                    </Box>
                    <Divider variant="middle" color={theme.palette.primary.main} sx={{ m: 2 }} />
                    <Stack p={3} display="flex" gap={2} sx={{ maxHeight: '400px', overflow: 'auto' }}>
                        {[...todos]
                            .sort((a, b) => a.date.toDate().getTime() - b.date.toDate().getTime())
                            .map((item) => (
                                <Todo
                                    name={item.name}
                                    date={item.date}
                                    description={item.description}
                                    id={item.id}
                                    key={item.id}
                                />
                            ))}
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    )
}
