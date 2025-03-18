import { useInfiniteQuery} from "@tanstack/react-query";
import { todoListApi } from "./api";
import { useCallback, useRef } from "react";

export function useTodoList(){
    const {
        data: todoItems, 
        error, 
        isLoading, 
        fetchNextPage, 
        hasNextPage, 
        isFetchingNextPage
    } = useInfiniteQuery({
        ...todoListApi.getTodoListInfiniteQueryOptions(),
    })
    
    const cursorRef = useIntersection(() => {
        fetchNextPage()
    })

    const cursor = (
        <div className="flex gap-2 mt-4" ref={cursorRef}>
            {!hasNextPage && <div>No data for loading</div>}
            {isFetchingNextPage && <div>...Loading</div>}
        </div>
    )
    
    return {error, todoItems, isLoading, cursor}
}

export function useIntersection(onIntersect: () => void){
    const unsubscribe = useRef(() => {})
    
    return useCallback((el: HTMLDivElement | null) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(intersection => {
                if(intersection.isIntersecting){
                    onIntersect()
                }
            })
        })
        if(el){
            observer.observe(el)
            unsubscribe.current = () => observer.unobserve
        } else {
            unsubscribe.current()
        }
    }, [])
}