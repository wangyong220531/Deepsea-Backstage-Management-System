type Local = {
    themeColor: string
}

interface PermissionMenu {
    name:string 
    children?: PermissionMenu[]
}

type Session = {
    token: string | undefined
    menu: PermissionMenu[]
}
