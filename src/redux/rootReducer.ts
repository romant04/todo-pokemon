import { combineReducers } from '@reduxjs/toolkit'
import todoSlice from '@/redux/todoSlice'

export const rootReducer = combineReducers({
    todos: todoSlice,
})

export type RootState = ReturnType<typeof rootReducer>
