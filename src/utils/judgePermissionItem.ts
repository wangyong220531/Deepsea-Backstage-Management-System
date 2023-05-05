const judgePermissionItem = (data: PermissionResult[]) => {
    if (data.find(e => e.name === "首页")) {
        return "0"
    }
    const followChidren: PermissionResult[] | undefined = structuredClone(
        data
            .find(e => e.name === "指挥")
            ?.children?.find(e => e.name === "警情处置")
            ?.children?.find(e => e.name === "跟进处置")?.children
    )
    followChidren && console.log(1)
}
