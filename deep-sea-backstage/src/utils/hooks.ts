import { useEffect } from "react"

export function useAsync(fn: () => Promise<void>, dependency?: any[]) {
    useEffect(() => {
        fn()
    }, dependency)
}
