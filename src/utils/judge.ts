const judgePermissionItem = (data: PermissionResult[]) => {
    const result: string[] = []
    if (data.find(e => e.name === "首页")) {
        result.push("0")
    }
    const followChidren: PermissionResult[] | undefined = data
        .find(e => e.name === "指挥")
        ?.children?.find(e => e.name === "警情处置")
        ?.children?.find(e => e.name === "跟进处置")?.children
    if (followChidren?.find(e => e.name === "警力跟进")) {
        const forceFollow = structuredClone(followChidren.find(e => e.name === "警力跟进"))
        if (forceFollow?.children?.find(e => e.name === "编辑")) {
            result.push("1-0-0")
        }
    }
    if (followChidren?.find(e => e.name === "警情跟进")) {
        const forceFollow = structuredClone(followChidren.find(e => e.name === "警情跟进"))
        if (forceFollow?.children?.find(e => e.name === "编辑")) {
            result.push("1-1-0")
        }
    }
    const roleChildren: PermissionResult[] | undefined = data.find(e => e.name === "系统管理")?.children?.find(e => e.name === "角色管理")?.children
    if (roleChildren) {
        if (roleChildren.find(e => e.name === "新增")) {
            result.push("6-0-0")
        }
        if (roleChildren.find(e => e.name === "编辑")) {
            result.push("6-0-1")
        }
        if (roleChildren.find(e => e.name === "授权")) {
            result.push("6-0-2")
        }
    }
    const userChildren: PermissionResult[] | undefined = data.find(e => e.name === "系统管理")?.children?.find(e => e.name === "用户管理")?.children
    if (userChildren) {
        if (userChildren.find(e => e.name === "导出")) {
            result.push("6-1-0")
        }
        if (userChildren.find(e => e.name === "编辑")) {
            result.push("6-1-1")
        }
        if (userChildren.find(e => e.name === "删除")) {
            result.push("6-1-2")
        }
    }
    const logChidren: PermissionResult[] | undefined = data.find(e => e.name === "系统管理")?.children?.find(e => e.name === "日志")?.children
    if (logChidren?.find(e => e.name === "登录日志")) {
        const loginLog: PermissionResult[] | undefined = logChidren.find(e => e.name === "登录日志")?.children
        if (loginLog?.find(e => e.name === "导出")) {
            result.push("7-0-0")
        }
    }
    if (logChidren?.find(e => e.name === "操作日志")) {
        const loginLog: PermissionResult[] | undefined = logChidren.find(e => e.name === "登录日志")?.children
        if (loginLog?.find(e => e.name === "导出")) {
            result.push("7-0-1")
        }
    }
    return Array.from(new Set(result))
}

export default judgePermissionItem
