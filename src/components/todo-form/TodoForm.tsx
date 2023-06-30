import { FC } from 'react'
import { Button, Stack, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'

export const TodoForm: FC = () => {
    return (
        <Stack display="flex" flexDirection="row" alignItems="flexStart" gap={5}>
            <Stack display="flex" flexDirection="column" gap={2}>
                <TextField size="small" label="Name" />
                <DatePicker slotProps={{ textField: { size: 'small' } }} />
                <Button variant="contained">Add todo</Button>
            </Stack>
            <TextField size="small" label="Description" multiline rows={4} />
        </Stack>
    )
}
