import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '../shared/api/queryClient'
import { TodoList } from '../modules/todo-list/TodoList'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export function App() {

  return (
    <QueryClientProvider client={queryClient}>
        <TodoList></TodoList>
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
