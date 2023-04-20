import createStorage from "../utils/persistentStorage"

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
        userType: "",
        userId: "",
        userNo: ""
    },
    "user",
    "session"
)
