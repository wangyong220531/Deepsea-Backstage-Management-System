import createStorage from "../utils/storage"

export const useLocal = createStorage<Local>(
    {
        themeColor: "#2a58ad"
    },
    "theme",
    "local"
)

export const useSession = createStorage<Session>(
    {
        token: undefined,
        menu: [],
        userType: ""
    },
    "user",
    "session"
)
