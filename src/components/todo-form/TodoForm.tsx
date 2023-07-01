import { FC, useReducer, useState } from 'react'
import { Button, Stack, TextField, useMediaQuery, useTheme } from '@mui/material'
import { useAppDispatch } from '@/redux/store'
import { Timestamp } from 'firebase/firestore'
import * as todo from '@/services/db/repositories/todo'
import { addTodo } from '@/redux/todoSlice'

interface FormState {
    name: string
    description: string
    date: Date | null
}

interface FormActions {
    type: 'set' | 'reset'
    field?: keyof FormState
    payload?: string | Date | null
}

function reducer(state: FormState, action: FormActions) {
    switch (action.type) {
        case 'reset': {
            return {
                ...state,
                name: '',
                description: '',
                date: null,
            }
        }
        case 'set': {
            if (!action.field) throw Error('Please provide a field')
            return {
                ...state,
                [action.field]: action.payload,
            }
        }
    }
}

export const TodoForm: FC = () => {
    const dispatch = useAppDispatch()
    const theme = useTheme()
    const [errorState, setErrorState] = useState(false)
    const [state, formDispatch] = useReducer(reducer, { name: '', description: '', date: null })

    const isSm = useMediaQuery(theme.breakpoints.down('sm'))

    const validateAndAdd = async () => {
        if (state.name && state.date && state.description) {
            const created = await todo.create({
                name: state.name,
                description: state.description,
                date: Timestamp.fromDate(state.date),
            })
            dispatch(addTodo(created))
            formDispatch({ type: 'reset' })
            setErrorState(false)
        } else {
            setErrorState(true)
        }
    }

    return (
        <Stack display="flex" flexDirection="row" alignItems="flexStart" gap={5}>
            {isSm ? (
                <>
                    <Stack width="100%" display="flex" flexDirection="column" gap={2}>
                        <TextField
                            error={!state.name && errorState}
                            size="small"
                            label="Name"
                            value={state.name}
                            onChange={(e) => formDispatch({ type: 'set', field: 'name', payload: e.target.value })}
                        />
                        <TextField
                            error={!state.description && errorState}
                            size="small"
                            label="Description"
                            multiline
                            rows={4}
                            value={state.description}
                            onChange={(e) =>
                                formDispatch({ type: 'set', field: 'description', payload: e.target.value })
                            }
                        />
                        <TextField
                            error={!state.date && errorState}
                            type="date"
                            size="small"
                            value={state.date?.toISOString().slice(0, 10) ?? ''}
                            onChange={(e) =>
                                formDispatch({ type: 'set', field: 'date', payload: new Date(e.target.value) })
                            }
                        />
                        <Button variant="contained" onClick={validateAndAdd}>
                            Add todo
                        </Button>
                    </Stack>
                </>
            ) : (
                <>
                    <Stack width="100%" display="flex" flexDirection="column" gap={2}>
                        <TextField
                            error={!state.name && errorState}
                            size="small"
                            label="Name"
                            value={state.name}
                            onChange={(e) => formDispatch({ type: 'set', field: 'name', payload: e.target.value })}
                        />
                        <TextField
                            error={!state.date && errorState}
                            type="date"
                            size="small"
                            value={state.date?.toISOString().slice(0, 10) ?? ''}
                            onChange={(e) =>
                                formDispatch({ type: 'set', field: 'date', payload: new Date(e.target.value) })
                            }
                        />
                        <Button variant="contained" onClick={validateAndAdd}>
                            Add todo
                        </Button>
                    </Stack>
                    <TextField
                        sx={{ width: '100%' }}
                        error={!state.description && errorState}
                        size="small"
                        label="Description"
                        multiline
                        rows={4}
                        value={state.description}
                        onChange={(e) => formDispatch({ type: 'set', field: 'description', payload: e.target.value })}
                    />
                </>
            )}
        </Stack>
    )
}
