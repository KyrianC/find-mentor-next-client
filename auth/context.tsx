import React from 'react'
import axios from 'axios'
import * as authTypes from './types'

const AuthContext = React.createContext<authTypes.AuthContextInterface | null>(null)

export const AuthProvider = ({ children }: authTypes.AuthContextProps): JSX.Element => {
    const [loading, setLoading] = React.useState(false)
    const [isAuthenticated, setIsAuthenticated] = React.useState(false)
    const [user, setUser] = React.useState<authTypes.UserResponse | null>(null)
    const [accessToken, setAccessToken] = React.useState<string | null>(null)
    const [refreshToken, setRefreshToken] = React.useState<string | null>(null)

    const ACCESS_TOKEN_LIFETIME = 1000 * 15 * 1

    const instance = axios.create({
        baseURL: process.env.BASE_API_URL,
        headers: {
            'Content-Type': 'application/json',
        }
    })



    const tokenIsValid = (expiryDate: number): boolean => {
        if (expiryDate < Date.now()) {
            return true
        } else {
            return false
        }
    }

    const fetchUserResponse = async (token: string) => {
        try {
            const res = await instance({
                url: 'auth/user/',
                method: 'get',
                headers: { Authorization: `Bearer ${token}` }
            })
            const user: authTypes.UserResponse = res.data
            setUser(user)
            setIsAuthenticated(true)
        } catch (err) {
            desAuthenticate()
        }
    }

    const setNewTokens = (accessToken: string, refreshToken?: string) => {
        setAccessToken(accessToken)
        localStorage.setItem('access_token', accessToken)
        const accessTokenExpiryDate = Date.now() + ACCESS_TOKEN_LIFETIME
        localStorage.setItem('expiry_date', JSON.stringify(accessTokenExpiryDate))

        if (refreshToken) {
            setRefreshToken(refreshToken)
            localStorage.setItem('refresh_token', refreshToken)
        }
    }

    const refresh = async (refreshToken: string) => {
        try {
            const res = await instance.post('token/refresh/', { refresh: refreshToken })
            const data: authTypes.RefreshTokenResponse = res.data
            setNewTokens(data.access)
            fetchUserResponse(data.access)
        } catch (err) {
            // in case of error or if both token are expired
            logout()
        }
    }



    const desAuthenticate = (): void => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('expiry_date')
        setUser(null)
        setAccessToken(null)
        setRefreshToken(null)
        setIsAuthenticated(false)
    }

    const authenticate = (data: authTypes.LoginResponse): void => {
        setNewTokens(data.access_token, data.refresh_token)
        setUser(data.user)
        setIsAuthenticated(true)
    }

    const login = async (postData: authTypes.loginData) => {
        setLoading(true)
        const res = await instance.post('auth/login/', postData)
        const data: authTypes.LoginResponse = res.data
        authenticate(data)
        setLoading(false)
    }

    const signUp = async (postData: authTypes.registerData): Promise<void> => {
        setLoading(true)
        const res = await instance.post('auth/registration/', postData)
        const data: authTypes.LoginResponse = res.data
        authenticate(data)
        setLoading(false)
    }

    const logout = async () => {
        await instance.post('auth/logout/')
        desAuthenticate()
    }



    const initAuth = () => {
        const localAccessToken = localStorage.getItem('access_token')
        const localRefreshToken = localStorage.getItem('refresh_token')
        const localDate = localStorage.getItem('expiry_date')
        if (localAccessToken !== null && localRefreshToken !== null && localDate !== null) {
            const date = Date.parse(localDate)
            if (tokenIsValid(date)) {
                fetchUserResponse(localAccessToken)
                setAccessToken(localAccessToken)
                setRefreshToken(localRefreshToken)
            } else {
                refresh(localRefreshToken) // will logout on fail (ex: if refresh token invalid)
            }
        }
    }

    React.useEffect(() => {
        initAuth()
    }, [])



    const value: authTypes.AuthContextInterface = {
        loading,
        isAuthenticated,
        user,
        accessToken,
        refreshToken,
        login,
        logout,
        signUp,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => React.useContext(AuthContext)
