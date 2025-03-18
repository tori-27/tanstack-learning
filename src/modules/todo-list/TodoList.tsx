import { useMutation } from "@tanstack/react-query";
import { useTodoList } from "./useTodoList";
import { todoListApi } from "./api";
import { nanoid } from "nanoid";

export function TodoList() {
    const {error, cursor, isLoading, todoItems} = useTodoList()

    const createTodoMutation = useMutation({
        mutationFn: todoListApi.createTodo
    })

    const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(e.currentTarget)

        const text = String(formData.get('text') ?? '')

        createTodoMutation.mutate({
            id: nanoid(),
            done: false,
            text: text,
            userId: '1'
        })

        e.currentTarget.reset()
    }

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
        <div className="p-5 mx-auto max-w-[1200px] mt-10">
            <h1 className="text-3xl font-bold underline mb-5">Todo List</h1>

            <form className="flex gap-2 mb-5" onSubmit={handleCreate}>
                <input className="rounded p-2 border border-teal-500" type="text" name="text"/>
                <button className="rounded p-2 border border-teal-500">Create</button>
            </form>
            <div className={"flex flex-col gap-4"}>
                {todoItems?.map(todo => (
                    <div className="border border-slate-300 rounded p-3" key={todo.id}>{todo.text}</div>
                ))}
            </div>
           {cursor}
        </div>
    )
}

