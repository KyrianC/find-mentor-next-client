import { Alert, AlertDescription, AlertIcon, Button, Container, FormControl, FormErrorIcon, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement, Link, Text, useToast } from "@chakra-ui/react";
import { NextPage } from "next";
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { ChangeEvent } from 'react';
import { useAuth } from "../auth/context";
import type { loginData } from '../auth/types';
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
    const { handleFormPost } = useForm()

    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [err, setErr] = React.useState<loginErrorResponse | null>(null)
    const [loading, setLoading] = React.useState(false)


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
            setErr: setErr,
            setLoading: setLoading,
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
                <FormControl mb="4" isInvalid={err?.username && true} isRequired>
                    <FormLabel>Username</FormLabel>
                    <InputGroup>
                        <Input
                            errorBorderColor="red.500"
                            onChange={handleUsernameChange}
                            type="text"
                        />
                        <InputRightElement children={<FormErrorIcon color="red.400" />} />
                    </InputGroup>
                    {err?.username?.map(error => (
                        <FormErrorMessage>{error}</FormErrorMessage>
                    ))}
                </FormControl>
                <FormControl mb="4" isInvalid={err?.password && true} isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                        <Input
                            errorBorderColor="red.500"
                            onChange={handlePasswordChange}
                            type="password"
                        />
                        <InputRightElement children={<FormErrorIcon color="red.400" />} />
                    </InputGroup>
                    {err?.password?.map(error => (
                        <FormErrorMessage>{error}</FormErrorMessage>
                    ))}
                </FormControl>
                <Text fontSize="sm" mb="4">Forgot Password? <NextLink href="/user/forgot-password"><Link color="teal">Click Here</Link></NextLink></Text>
                <Button mb="4" disabled={auth.isAuthenticated} isLoading={loading} colorScheme="teal" type="submit">Login</Button>
            </form>
            <Text fontSize="sm">Don't have an account? <NextLink href="/signup"><Link color="teal">Register here</Link></NextLink></Text>
        </Container>
    )
}

export default Login
