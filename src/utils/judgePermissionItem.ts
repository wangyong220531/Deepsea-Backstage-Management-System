const judgePermissionItem = (data: PermissionResult[]) => {
    const result: string[] = []
    if (data.find(e => e.name === "首页")) {
        result.push("0")
    }
    const followChidren: PermissionResult[] | undefined = structuredClone(
        data
            .find(e => e.name === "指挥")
            ?.children?.find(e => e.name === "警情处置")
            ?.children?.find(e => e.name === "跟进处置")?.children
    )
    if (followChidren) {
        if (followChidren.find(e => e.name === "警力跟进")) {
            const forceFollow = structuredClone(followChidren.find(e => e.name === "警力跟进"))
            if (forceFollow?.children?.find(e => e.name === "跟进")) {
                result.push("1-0-0")
            }
            if (forceFollow?.children?.find(e => e.name === "处置")) {
                result.push("1-0-1")
            }
            if (forceFollow?.children?.find(e => e.name === "到场")) {
                result.push("1-0-2")
            }
        }
        if (followChidren.find(e => e.name === "警情跟进")) {
            const forceFollow = structuredClone(followChidren.find(e => e.name === "警情跟进"))
            if (forceFollow?.children?.find(e => e.name === "跟进")) {
                result.push("1-1-0")
            }
        }
    }
}
