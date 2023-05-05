type Local = {
    themeColor: string
}

interface PermissionMenu {
    permissionName: string
    permissionPath: string
    children?: PermissionMenu[]
}

type Session = {
    token: string | undefined
    menu: PermissionResult[]
    userType: string
    userId: string
    userNo: string
}

interface Route {
    name: string
    path: string
    component: ReactNode
    children?: RouteChild[]
    icon: ReactNode
}
