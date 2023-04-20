interface Permission {
    id?: string
    permissionName: string
    permissionPath?: string
    children?: Permission[]
}

interface PermissionResult {
    name: string
    path?: string
    children?: PermissionResult[]
}

interface TreeNode {
    key?: string
    title: string
    children?: TreeNode[]
}

export const handlePermission = (data: Permission[]): PermissionResult[] => {
    return data.map((e: Permission) => {
        if (e.children && e.children.length) {
            return {
                name: e.permissionName,
                path: e.permissionPath,
                children: handlePermission(e.children)
            }
        }
        return {
            name: e.permissionName,
            path: e.permissionPath
        }
    })
}

export const handleOperates = (data: Permission[]): PermissionResult[] => {
    return data.map((e: Permission) => {
        if (e.children && e.children.length) {
            return {
                id: e.id,
                name: e.permissionName,
                children: handleOperates(e.children)
            }
        }
        return {
            id: e.id,
            name: e.permissionName
        }
    })
}

export const handleTree = (data: Permission[]): TreeNode[] => {
    return data.map((e: Permission) => {
        if (e.children && e.children.length) {
            return {
                key: e.id,
                title: e.permissionName,
                children: handleTree(e.children)
            }
        }
        return {
            key: e.id,
            title: e.permissionName
        }
    })
}
