import LayoutFC from "./Pages/Layout"
import "./css/index.less"
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom"
import Login from "./Pages/Login"
import { ReactNode } from "react"
import routes from "./routes"
import { useSession } from "./store"
import NotFound from "./Pages/NotFound"
import Stability from "./components/Stability"
import StabilityDetail from "./components/StabilityTable"
import StabilityTable from "./components/StabilityTable"

const Auth: React.FC<{ children: ReactNode }> = props => {
    const { children } = props
    const store = useSession()
    const login = store.token
    return login ? <>{children}</> : <Navigate to={"/login"} replace={true} />
}

interface RedirectProps {
    from: string
    to: string
    children?: ReactNode
}

function Redirect(props: RedirectProps) {
    const { from, to, children } = props
    const location = useLocation()
    return location.pathname === from ? <Navigate to={to} replace={true} /> : <>{children}</>
}

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />}></Route>
                <Route
                    path="/"
                    element={
                        <Auth>
                            <Redirect from="/" to={`/${routes[0].path}`}>
                                <LayoutFC></LayoutFC>
                            </Redirect>
                        </Auth>
                    }
                >
                    {routes.map(route => (
                        <Route
                            path={route.path}
                            key={route.path}
                            element={
                                <Auth>
                                    {route.children ? (
                                        <Redirect from={`/${route.path}`} to={`/${route.path}/${route.children[0].path}`}>
                                            {route.component}
                                        </Redirect>
                                    ) : (
                                        route.component
                                    )}
                                </Auth>
                            }
                        >
                            {route.children && route.children.map(item => <Route key={item.path} path={`${item.path}/*`} element={<Auth>{item.component}</Auth>} />)}
                        </Route>
                    ))}
                </Route>
                <Route path="/stability" element={<Stability />} />
                <Route path="/stabilityDetail" element={<StabilityDetail />} />
                <Route path="/stabilityTable" element={<StabilityTable />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
