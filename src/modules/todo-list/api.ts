const BASE_URL = "http://localhost:3000"

export type TodoDto = {
    id: string,
    text: string,
    done: boolean,
};

export const todoListApi = {
    getTodoList: ({signal} : {signal: AbortSignal}) => {
        return fetch(`${BASE_URL}/tasks`, {
            signal
        }).then(resolve => resolve.json() as Promise<TodoDto[]>);
    }
}