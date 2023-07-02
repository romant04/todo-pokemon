import { combineReducers } from '@reduxjs/toolkit'
import todoSlice from '@/redux/todoSlice'
import pageSlice from '@/redux/pageSlice'

export const rootReducer = combineReducers({
    todos: todoSlice,
    page: pageSlice,
})

export type RootState = ReturnType<typeof rootReducer>
