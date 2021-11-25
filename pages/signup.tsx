import { useToast, Alert, AlertDescription, AlertIcon, Button, Container, FormControl, FormErrorIcon, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement, Link, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import NextLink from 'next/link';
import React, { ChangeEvent } from 'react';
import { useRouter } from 'next/router'
import { useAuth } from "../auth/context";
import type { registerData } from '../auth/types';
import axios, { AxiosError } from 'axios'

type registerErrorResponse = {
    non_field_errors?: string[]
    username?: string[],
    email?: string[]
    password1?: string[]
    password2?: string[]
}

const Login: NextPage = () => {
    const auth = useAuth()
    const toast = useToast()
    const router = useRouter()

    const defaultFormData: registerData = {
        username: '',
        email: '',
        password1: '',
        password2: '',
    }

    const [formData, setFormData] = React.useState<registerData>(defaultFormData)
    const [err, setErr] = React.useState<registerErrorResponse | null>(null)
    const [loading, setLoading] = React.useState(false)


    const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        const formDataAllowedKeys = Object.keys(defaultFormData)
        if (!formDataAllowedKeys.includes(name)) {
            throw TypeError(`"${name}" not in "${formDataAllowedKeys}"`)
        }

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true)
        e.preventDefault()
        try {
            await auth.signUp(formData)
            setLoading(false)
            router.push('/user')
            toast({
                title: 'Successfully Registered.',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top',
                variant: 'solid'
            })
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const registerError = err as AxiosError<registerErrorResponse>
                if (registerError && registerError.response) {
                    setErr(registerError.response.data)
                }
            }
            setLoading(false)
            toast({
                title: "something went wrong",
                status: "error",
                duration: 2500,
                position: 'top'
            })
        }
    }


    return (
        <Container>
            {err?.non_field_errors && <Alert my="2" borderRadius="md" status="error">
                <AlertIcon />
                <AlertDescription>{err?.non_field_errors}</AlertDescription>
            </Alert>}


            <form onSubmit={handleSignUp}>
                <FormControl mb="4" isInvalid={err?.username && true} isRequired>
                    <FormLabel>Username</FormLabel>
                    <InputGroup>
                        <Input
                            name="username"
                            errorBorderColor="red.500"
                            onChange={handleFormChange}
                            type="text"
                        />
                        <InputRightElement children={<FormErrorIcon color="red.400" />} />
                    </InputGroup>
                    <FormErrorMessage>{err?.username}</FormErrorMessage>
                </FormControl>

                <FormControl mb="4" isInvalid={err?.email && true} isRequired>
                    <FormLabel>Email</FormLabel>
                    <InputGroup>
                        <Input
                            name="email"
                            errorBorderColor="red.500"
                            onChange={handleFormChange}
                            type="text"
                        />
                        <InputRightElement children={<FormErrorIcon color="red.400" />} />
                    </InputGroup>
                    <FormErrorMessage>{err?.email}</FormErrorMessage>
                </FormControl>

                <FormControl mb="4" isInvalid={err?.password1 && true} isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                        <Input
                            name="password1"
                            errorBorderColor="red.500"
                            onChange={handleFormChange}
                            type="password"
                        />
                        <InputRightElement children={<FormErrorIcon color="red.400" />} />
                    </InputGroup>
                    {err?.password1?.map(error => (
                        <FormErrorMessage>{error}</FormErrorMessage>
                    ))}
                </FormControl>

                <FormControl mb="4" isInvalid={err?.password2 && true} isRequired>
                    <FormLabel>Confirm Password</FormLabel>
                    <InputGroup>
                        <Input
                            name="password2"
                            errorBorderColor="red.500"
                            onChange={handleFormChange}
                            type="password"
                        />
                        <InputRightElement children={<FormErrorIcon color="red.400" />} />
                    </InputGroup>
                    {err?.password2?.map(error => (
                        <FormErrorMessage>{error}</FormErrorMessage>
                    ))}
                </FormControl>
                <Button mb="4" disabled={auth.isAuthenticated} isLoading={loading} colorScheme="teal" type="submit">Sign Up</Button>
            </form>


            <Text fontSize="sm">Already have an account? <NextLink href="/login"><Link color="teal">Login here</Link></NextLink></Text>
        </Container>
    )
}

export default Login
