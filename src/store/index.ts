import createStorage from "../utils/storage"

export const useLocal = createStorage<Local>(
    {
        themeColor: "#fff"
    },
    "theme",
    "local"
)

export const useSession = createStorage<Session>(
    {
        token: undefined
    },
    "user",
    "session"
)
