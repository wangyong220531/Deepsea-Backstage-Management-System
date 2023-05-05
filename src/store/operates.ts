import createStore from "easy-zustand"

interface Operate {
    item: PermissionResult[]
}

const useOperates = createStore<Operate>({
    item: []
})

export default useOperates
