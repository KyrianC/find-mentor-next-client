import React from 'react'
import axios from 'axios'
import * as authTypes from './types'
import { useToast } from "@chakra-ui/react"

/* HACK need a default/dummy context to pass to React.createContext
* because it needs intial value, otherwise we would need to pass:
*   `React.CreateContext<AuthContextInterface | null>(null)`
* and we would need to check if value is null each time in views */
const defaultAuthContext: authTypes.AuthContextInterface = {
    isAuthenticated: false,
    user: null,
    login: async () => { },
    logout: async () => { },
    signUp: async () => { },
    resetPassword: async () => { },
    authInstance: axios
}

const AuthContext = React.createContext<authTypes.AuthContextInterface>(defaultAuthContext)

const AuthProvider = ({ children }: authTypes.AuthContextProps): JSX.Element => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false)
    const [user, setUser] = React.useState<authTypes.UserResponse | null>(null)

    const toast = useToast()

    const ACCESS_TOKEN_LIFETIME = 1000 * 60 * 5 // 5min

    const baseAxiosConfig = {
        baseURL: process.env.BASE_API_URL,
        headers: {
            'Content-Type': 'application/json',
        }
    }

    // will be used by every requests made by authenticated users
    const authInstance = axios.create(baseAxiosConfig)

    // this one for login, signup, refresh only
    const instance = axios.create(baseAxiosConfig)

    // inject token in every auth requests
    authInstance.interceptors.request.use(
        async (config) => {
            const { localAccessToken } = getLocalTokens()
            config.headers && (config.headers['Authorization'] = `Bearer ${localAccessToken}`)
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    // if token invalid resulting in 401, try refresh token and retry request
    authInstance.interceptors.response.use(
        (res) => res,
        async (err) => {
            const originalConfig = err.config
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true
                try {
                    const { localRefreshToken } = getLocalTokens()
                    localRefreshToken && await refresh(localRefreshToken)
                    return authInstance(originalConfig)
                } catch (_error) {
                    return Promise.reject(_error)
                }
            }
            return Promise.reject(err)
        }
    )

    const fetchUserResponse = async () => {
        try {
            const res = await authInstance.get('auth/user/')
            const user: authTypes.UserResponse = res.data
            setUser(user)
            setIsAuthenticated(true)
        } catch (err) {
            desAuthenticate()
        }
    }

    const setNewTokens = (access: string, refresh?: string) => {
        localStorage.setItem('access_token', access)
        const accessTokenExpiryDate = Date.now() + ACCESS_TOKEN_LIFETIME
        localStorage.setItem('expiry_date', JSON.stringify(accessTokenExpiryDate))

        if (refresh) {
            localStorage.setItem('refresh_token', refresh)
        }
    }

    const refresh = async (refreshToken: string) => {
        try {
            const res = await instance.post('token/refresh/', { refresh: refreshToken })
            const data: authTypes.RefreshTokenResponse = res.data
            setNewTokens(data.access)
            await fetchUserResponse()
        } catch (err) {
            toast({
                title: "Session has Expired",
                duration: 2500,
                position: "top",
                status: "error"
            })
            logout()
        }
    }


    const desAuthenticate = (): void => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('expiry_date')
        setUser(null)
        setIsAuthenticated(false)
    }

    const authenticate = (data: authTypes.LoginResponse): void => {
        setNewTokens(data.access_token, data.refresh_token)
        setUser(data.user)
        setIsAuthenticated(true)
    }

    const login = async (postData: authTypes.loginData) => {
        const res = await instance.post('auth/login/', postData)
        const data: authTypes.LoginResponse = res.data
        authenticate(data)
    }

    const signUp = async (postData: authTypes.registerData): Promise<void> => {
        const res = await instance.post('auth/registration/', postData)
        const data: authTypes.LoginResponse = res.data
        authenticate(data)
    }

    const logout = async () => {
        await authInstance.post('auth/logout/')
        desAuthenticate()
        toast({
            title: "Logged Out",
            status: "info",
            position: "top",
            duration: 2500
        })
    }

    const resetPassword = async (postData: { email: string }) => {
        await authInstance.post('auth/password/reset/', postData)
    }

    const getLocalTokens = () => {
        const localAccessToken = localStorage.getItem('access_token')
        const localRefreshToken = localStorage.getItem('refresh_token')
        const localDate = localStorage.getItem('expiry_date')
        return {
            localAccessToken,
            localRefreshToken,
            localDate
        }
    }


    const initAuth = () => {
        const { localAccessToken, localRefreshToken, localDate } = getLocalTokens()
        if (localAccessToken !== null && localRefreshToken !== null && localDate !== null) {
            const date = parseInt(localDate)
            if (date > Date.now()) {
                fetchUserResponse()
            } else {
                refresh(localRefreshToken) // will logout on fail (ex: if refresh token invalid)
            }
        }
    }

    React.useEffect(() => {
        initAuth()
    }, [])



    const value: authTypes.AuthContextInterface = {
        isAuthenticated,
        user,
        login,
        logout,
        signUp,
        resetPassword,
        authInstance
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => React.useContext(AuthContext)

export default AuthProvider
