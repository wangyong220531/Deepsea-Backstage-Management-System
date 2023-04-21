interface Permission {
    id?: string
    permissionName: string
    permissionPath?: string
    children?: Permission[]
}

interface TreeNode {
    key: string
    title: string
    children?: TreeNode[]
}

export const handlePermission = (data: MenuChild[]): PermissionResult[] => {
    return data.map((e: MenuChild) => {
        if (e.childList && e.childList.length) {
            return {
                name: e.permissionName,
                path: e.permissionPath,
                children: handlePermission(e.childList)
            }
        }
        return {
            name: e.permissionName,
            path: e.permissionPath
        }
    })
}

export const handleOperates = (data: MenuChild[]): PermissionResult[] => {
    return data.map((e: MenuChild) => {
        if (e.childList && e.childList.length) {
            return {
                id: e.id,
                name: e.permissionName,
                path:"",
                children: handleOperates(e.childList)
            }
        }
        return {
            id: e.id,
            name: e.permissionName,
            path:""
        }
    })
}

export const handleTree = (data: MenuChild[]): TreeNode[] => {
    return data.map((e: MenuChild) => {
        if (e.childList && e.childList.length) {
            return {
                key: e.id,
                title: e.permissionName,
                children: handleTree(e.childList)
            }
        }
        return {
            key: e.id,
            title: e.permissionName
        }
    })
}
