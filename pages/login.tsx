import { Alert, AlertDescription, AlertIcon, Button, Container, Link, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { ChangeEvent } from 'react';
import { useAuth } from "../auth/context";
import type { loginData } from '../auth/types';
import FormInput from '../components/Form/CustomInput';
import useForm from '../utils/useForm';


type loginErrorResponse = {
    non_field_errors?: string[]
    username?: string[],
    email?: string[]
    password?: string[]
}

const Login: NextPage = () => {
    const auth = useAuth()
    const router = useRouter()
    const { handleFormPost, err, loading } = useForm()

    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')


    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
    }
    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const handleLogin = (e: React.FormEvent) => {
        handleFormPost<loginErrorResponse, loginData>({
            event: e,
            postData: { username, password },
            fetcher: auth.login,
            toastSuccess: 'Successfully Logged In.',
            toastErr: 'Something went wrong.',
            onSuccess: () => { router.push('/') }
        })
    }


    return (
        <Container>
            {err?.non_field_errors && <Alert my="2" borderRadius="md" status="error">
                <AlertIcon />
                <AlertDescription>{err?.non_field_errors}</AlertDescription>
            </Alert>}
            <form onSubmit={handleLogin}>
                <FormInput
                    isRequired
                    label="Username"
                    name="username"
                    inputType="text"
                    handleChange={handleUsernameChange}
                    errors={err?.username}
                />
                <FormInput
                    isRequired
                    label="Password"
                    name="password"
                    inputType="password"
                    handleChange={handlePasswordChange}
                    errors={err?.password}
                />
                <Text fontSize="sm" mb="4">
                    Forgot Password?{" "}
                    <NextLink href="/user/forgot-password">
                        <Link color="teal">Click Here</Link>
                    </NextLink>
                </Text>
                <Button
                    mb="4"
                    isLoading={loading}
                    colorScheme="teal"
                    type="submit"
                >
                    Login
                </Button>
            </form>
            <Text fontSize="sm">
                Don't have an account?{" "}
                <NextLink href="/signup">
                    <Link color="teal">Register here</Link>
                </NextLink>
            </Text>
        </Container>
    )
}

export default Login
