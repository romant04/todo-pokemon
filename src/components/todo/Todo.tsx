import { FC, useReducer, useState } from 'react'
import { Box, Stack, TextField, Typography, useTheme } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { TodoRecord } from '@/components/todo/todo.interface'
import * as todo from '@/services/db/repositories/todo'
import { useAppDispatch } from '@/redux/store'
import { editTodo, removeTodo } from '@/redux/todoSlice'
import { Timestamp } from 'firebase/firestore'

interface FormState {
    name: string
    description: string
    date: Date | null
}

interface FormActions {
    type: 'set'
    field: keyof FormState
    payload: string | Date | null
}

function reducer(state: FormState, action: FormActions) {
    switch (action.type) {
        case 'set': {
            return {
                ...state,
                [action.field]: action.payload,
            }
        }
    }
}

export const Todo: FC<TodoRecord> = ({ id, name, description, date }: TodoRecord) => {
    const dispatch = useAppDispatch()
    const theme = useTheme()
    const [isEdited, setIsEdited] = useState(false)
    const [state, formDispatch] = useReducer(reducer, { name: name, description: description, date: date.toDate() })

    const isValid = state.name != '' && state.description != '' && state.date != null

    const handleDelete = () => {
        void todo.remove(id)
        dispatch(removeTodo(id))
    }

    const handleEdit = async () => {
        if (isValid) {
            const editedTodo = await todo.update(id, {
                name: state.name,
                description: state.description,
                date: Timestamp.fromDate(state.date as Date),
            })
            dispatch(editTodo(editedTodo))
            setIsEdited(false)
        }
    }

    return (
        <Stack
            sx={{ background: theme.palette.primary.dark, borderRadius: 2 }}
            p={2}
            gap={5}
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="flex-start"
        >
            <Stack>
                {isEdited ? (
                    <>
                        <TextField
                            error={!state.name}
                            value={state.name}
                            sx={{ color: 'white' }}
                            onChange={(e) => formDispatch({ type: 'set', field: 'name', payload: e.target.value })}
                            variant="filled"
                        />
                        <TextField
                            multiline
                            error={!state.description}
                            value={state.description}
                            sx={{ color: 'white' }}
                            onChange={(e) =>
                                formDispatch({ type: 'set', field: 'description', payload: e.target.value })
                            }
                            variant="filled"
                        />
                        <TextField
                            type="date"
                            error={!state.date}
                            value={state.date?.toISOString().slice(0, 10)}
                            onChange={(e) =>
                                formDispatch({ type: 'set', field: 'date', payload: new Date(e.target.value) })
                            }
                            onKeyDown={(e) => {
                                e.preventDefault()
                                return false
                            }}
                            sx={{ color: 'white' }}
                            variant="filled"
                        />
                    </>
                ) : (
                    <>
                        <Typography variant="h6" fontWeight="bold" color="#FFFFFF">
                            {name}
                        </Typography>
                        <Typography variant="body1" color="#E1E1E1" sx={{ maxWidth: '500px' }}>
                            {description}
                        </Typography>
                        <Typography variant="body2" color="white" sx={{ mt: 1.5 }}>
                            {date.toDate().toLocaleDateString()}
                        </Typography>
                    </>
                )}
            </Stack>
            <Stack gap={2}>
                <Box
                    onClick={handleDelete}
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
                {isEdited ? (
                    <Box
                        onClick={handleEdit}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            borderRadius: '100%',
                            padding: 0,
                            width: 35,
                            height: 35,
                            background: isValid ? theme.palette.success.main : theme.palette.text.disabled,
                            color: 'white',
                            cursor: isValid ? 'pointer' : 'not-allowed',
                            '&:hover': {
                                background: isValid ? theme.palette.success.light : theme.palette.text.disabled,
                            },
                        }}
                    >
                        <FontAwesomeIcon icon={faCheck} />{' '}
                    </Box>
                ) : (
                    <Box
                        onClick={() => setIsEdited(true)}
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
                )}
            </Stack>
        </Stack>
    )
}
