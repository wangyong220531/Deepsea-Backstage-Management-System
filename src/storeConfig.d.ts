type Local = {
    themeColor: string
}

interface PermissionMenu {
    name: string
    path: string
    children?: PermissionMenu[]
}

type Session = {
    token: string | undefined
    menu: PermissionMenu[]
    userType: string
    userId: string
}
