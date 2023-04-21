import createStore from "easy-zustand"

interface Operate {
    item: PermissionResult[]
}

interface Item {
    id: string
    permissionName: string
    children?: Item[]
}

const useOperates = createStore<Operate>({
    item: []
})

export default useOperates
