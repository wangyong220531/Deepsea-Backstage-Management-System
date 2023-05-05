import routes from "../routes"

const getBreaks = (data: String) => {
    return routes
        .map(e => {
            if (e.path === data) {
                return e.name
            }
            return e.children?.find(e => e.path === data) ? e.children?.find(e => e.path === data)?.name : e.children?.map(a => a.children?.find(e => e.path === data)?.name)
        })
        .filter(e => e)
        .flat()
}

export default getBreaks