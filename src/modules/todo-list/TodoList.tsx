import { useQuery } from "@tanstack/react-query";

type Todo = {
    id: string,
    text: string,
    done: boolean,
}

export const getTasks = () =>{
    return new Promise<Todo[]>((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: "1",
                    text: 'todo1',
                    done: false
                },
                {
                    id: "2",
                    text: 'todo2',
                    done: false
                },
            ]);
        }, 1000)
    });
};

export function TodoList() {
    const {data, error, isLoading} = useQuery({
        queryKey: ["tasks", "list"],
        queryFn: getTasks
    })
    if(isLoading){
        return(
            <div>Loading...</div>
        )
    }

    if(error){
        return(
            <div>error: {JSON.stringify(error)}</div>
        )
    }
    return(
        <div>{data?.map(todo => <div key={todo.id}>{todo.text}</div>)}</div>
    )
}