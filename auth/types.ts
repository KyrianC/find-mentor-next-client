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
    loading: boolean
    isAuthenticated: boolean
    user: UserResponse | null
    accessToken: string | null
    refreshToken: string | null
    login: (postData: loginData) => Promise<void>
    logout: () => Promise<void>
    signUp: (postData: registerData) => Promise<void>
}

export interface AuthContextProps {
    children: React.ReactNode
}
