import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export default function createStorage<T extends Object>(data: T, name: string, type: "session" | "local") {
    type SetState = (newState: Partial<T>) => void
    return create(
        persist<T & { setState: SetState }>(
            set => ({
                ...data,
                setState: (newState: Partial<T>) => {
                    set(oldState => ({ ...oldState, ...newState }))
                }
            }),
            {
                name,
                storage: createJSONStorage(() => (type === "session" ? sessionStorage : localStorage))
            }
        )
    )
}
