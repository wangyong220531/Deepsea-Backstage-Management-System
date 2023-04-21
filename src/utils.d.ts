interface PermissionResult {
    name: string
    path: string
    children?: PermissionResult[]
}