import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { TodoRecord } from '@/components/todo/todo.interface'

export interface CounterState {
    todos: TodoRecord[]
}

const initialState: CounterState = {
    todos: [],
}

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        initTodos: (state, action: PayloadAction<TodoRecord[]>) => {
            state.todos = action.payload
        },
        addTodo: (state, action: PayloadAction<TodoRecord>) => {
            state.todos.push(action.payload)
        },
        removeTodo: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter((todo) => todo.id != action.payload)
        },
    },
})

export const { initTodos, addTodo, removeTodo } = todosSlice.actions

export default todosSlice.reducer
