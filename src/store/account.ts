import createStore from "easy-zustand"

interface Account {
    login: string
}

const useAccount = createStore<Account>({
    login: ""
})

useAccount.subscribe(state => {
    if (state.login) {
        document.cookie = "state.login"
        return
    }
    // document.cookie.split("; ").forEach(item => (document.cookie = `${item}; expires=${new Date(0)}`))
})

export default useAccount
