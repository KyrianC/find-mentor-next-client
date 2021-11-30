import { AxiosInstance } from "axios"

export interface UserResponse {
    id: number;
    email: string;
    username: string;
}

export interface TokenResponse {
    access_token: string;
    refresh_token: string;
}

export interface LoginResponse extends TokenResponse {
    user: UserResponse
}

export interface RefreshTokenResponse {
    access: string
}



export type registerData = {
    username: string
    email: string
    password1: string
    password2: string
}

export type loginData = {
    username: string,
    password: string
} | {
    email: string,
    password: string
}



export interface AuthContextInterface {
    isAuthenticated: boolean
    user: UserResponse | null
    login: (postData: loginData) => Promise<void>
    logout: () => Promise<void>
    signUp: (postData: registerData) => Promise<void>
    resetPassword: (postData: { email: string }) => Promise<void>
    authInstance: AxiosInstance
}

export interface AuthContextProps {
    children: React.ReactNode
}
