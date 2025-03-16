const BASE_URL = "http://localhost:3000"
export type PaginateResult<T> = {
    data: T[]
    first: number
    items: number
    last: number | null
    next: number | null
    pages: number
    prev: number | null
}
export type TodoDto = {
    id: string,
    text: string,
    done: boolean,
};

export const todoListApi = {
    getTodoList: (
        {page} : {page: number}, 
        {signal} : {signal: AbortSignal}
    ) => {
        return fetch(`${BASE_URL}/tasks?_page=${page}&_per_page=10`, {
            signal
        }).then(resolve => resolve.json() as Promise<PaginateResult<TodoDto>>);
    }
}