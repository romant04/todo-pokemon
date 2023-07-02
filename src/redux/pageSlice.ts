import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 1,
}

export const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        setCurrPage: (state, action: PayloadAction<number>) => {
            state.value = action.payload
        },
    },
})

export const { setCurrPage } = pageSlice.actions

export default pageSlice.reducer
