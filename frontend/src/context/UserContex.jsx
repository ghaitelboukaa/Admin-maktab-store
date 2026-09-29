import { useContext, useEffect, useState } from "react"
import { createContext } from "react"
import { axiosClient } from "../../api/axios"

export const UserStateContext = createContext({
    User: {},
    setUser: () => { },
    admin: {},
    setAdmin: () => { },
    logout: () => { },
    logoutA: () => { },
    login: (value) => { },
    signup: (value) => { },
    signupA: (value) => { },
    autenticated: false,
    setAutenticated: () => { },
    Aautenticated: false,
    setAautenticated: () => { },
    setToken: () => { },
})
export default function UserContex({ children }) {

    const [User, setUser] = useState({})
    const [admin, setAdmin] = useState({})
    const [autenticated, _setAutenticated] = useState('true' === window.localStorage.getItem('AUTENTICATED'))
    const [Aautenticated, _setAautenticated] = useState('true' === window.localStorage.getItem('A_AUTENTICATED'))

    // useEffect(() => {

    //     axiosClient.get('/api/admin').then(
    //         ({ data }) => {
    //             setAdmin(data);
    //         }
    //     )


    // }, [Aautenticated])

    const logout = () => {
        setUser({});
        setAutenticated(false)
    }

    const logoutA = () => {
        setAdmin({});
        setAautenticated(false)
    }

    const login = async (value) => {
        // await UserApi.getCsrf()
        return await axiosClient.post('/api/login', value)
    }
    const signup = async (value) => {
        // await UserApi.getCsrf()
        // return UserApi.signup(value)
    }

    const signupA = async (value) => {
        // await UserApi.getCsrf()
        // return UserApi.signup_T(value,)
    }

    const setAutenticated = (isAutenticated) => {
        _setAutenticated(isAutenticated)
        window.localStorage.setItem('AUTENTICATED', isAutenticated)

    }
    const setAautenticated = (isAutenticated) => {
        _setAautenticated(isAutenticated)
        window.localStorage.setItem('A_AUTENTICATED', isAutenticated)

    }

    const setToken = (token) => {
        window.localStorage.setItem('token', token)

    }

    return <>
        <UserStateContext.Provider value={{
            User,
            setUser,
            admin,
            setAdmin,
            logout,
            logoutA,
            login,
            signup,
            signupA,
            autenticated,
            setAutenticated,
            Aautenticated,
            setAautenticated,
            setToken,
        }}>
            {children}
        </UserStateContext.Provider>

    </>


}

export const useUserContext = () => useContext(UserStateContext)

