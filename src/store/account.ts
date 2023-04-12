import createStore from "easy-zustand"

interface Account {
    login: boolean
}

const useAccount = createStore<Account>({
    login: document.cookie.includes("login=1")
})

useAccount.subscribe(state => {
    if (state.login) {
        document.cookie = "login=1"
        return
    }
    document.cookie.split("; ").forEach(item => (document.cookie = `${item}; expires=${new Date(0)}`))
})

export default useAccount
