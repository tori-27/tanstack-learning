import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query"
import { jsonApiInstance } from "../../shared/api/apiInstance"

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
    userId: string
};

export const todoListApi = {
    getTodoListQueryOptions: ({page}: {page: number}) => {
        return queryOptions({
            queryKey: ["tasks", "list", {page}],
            queryFn: (meta) => jsonApiInstance<PaginateResult<TodoDto>>(`/tasks?_page=${page}&_per_page=10`, {signal: meta.signal})
        })
    },

    getTodoListInfiniteQueryOptions: () => {
        return infiniteQueryOptions({
            queryKey: ["tasks", "list"],
            queryFn: (meta) => jsonApiInstance<PaginateResult<TodoDto>>(`/tasks?_page=${meta.pageParam}&_per_page=10`, {signal: meta.signal}),
            initialPageParam: 1,
            getNextPageParam: (result) => result.next,
            select: result => result.pages.flatMap(page => page.data)
        })
    },

    createTodo: (data : TodoDto) => {
        return jsonApiInstance<TodoDto>(`/tasks`, {
            method: 'POST',
            json:data
        })
    },
    updateTodo: (id: string, data : Partial<TodoDto>) => {
        return jsonApiInstance<TodoDto>(`/tasks/${id}`, {
            method: 'PATCH',
            json:data
        })
    },
    deleteTodo: (id: string) => {
        return jsonApiInstance(`/tasks/${id}`, {
            method: 'DELETE',
        })
    }

}