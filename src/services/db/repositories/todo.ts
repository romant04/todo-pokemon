import db from '..'
import { TodoInterface as Todo, TodoRecord } from '@/components/todo/todo.interface'

const COLLECTION_NAME = 'todos'

export const all = async (): Promise<Array<Todo>> => {
    const snapshot = await db.collection(COLLECTION_NAME).get()
    const data: Array<unknown> = []

    snapshot.docs.map((_data) => {
        data.push({
            id: _data.id,
            ..._data.data(),
        })
    })

    return data as Array<Todo>
}

export const create = async (todo: Todo): Promise<TodoRecord> => {
    const docRef = await db.collection(COLLECTION_NAME).add(todo)

    return {
        id: docRef.id,
        ...todo,
    } as TodoRecord
}

export const update = async (id: string, todo: Todo): Promise<TodoRecord> => {
    await db.collection(COLLECTION_NAME).doc(id).update(todo)

    return {
        id: id,
        ...todo,
    } as TodoRecord
}

export const remove = async (id: string) => {
    await db.collection(COLLECTION_NAME).doc(id).delete()

    return {
        id: id,
    }
}
