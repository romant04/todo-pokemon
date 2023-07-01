import { Timestamp } from 'firebase/firestore'

export interface TodoRecord {
    id: string
    name: string
    description: string
    date: Timestamp
}

export interface TodoInterface {
    name: string
    description: string
    date: Timestamp
}
