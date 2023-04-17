import createStore from "easy-zustand"

interface Users {
    acount: string
    selected: string[]
}

const useRole = createStore<Users>({
    acount: "",
    selected: []
})

export default useRole
