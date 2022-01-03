import { Alert, AlertDescription, AlertIcon, Button, Container, Link, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useAuth } from "../auth/context";
import type { registerData } from '../auth/types';
import FormInput from '../components/Form/CustomInput';
import useForm from '../utils/useForm';

type registerErrorResponse = {
    non_field_errors?: string[]
    username?: string[],
    email?: string[]
    password1?: string[]
    password2?: string[]
}

const Login: NextPage = () => {
    const auth = useAuth()
    const router = useRouter()
    const { handleFormPost, err, loading } = useForm()

    const defaultFormData: registerData = {
        username: '',
        email: '',
        password1: '',
        password2: '',
    }

    const [formData, setFormData] = React.useState<registerData>(defaultFormData)


    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const handleSignUp = (e: React.FormEvent) => {
        handleFormPost<registerErrorResponse, registerData>({
            event: e,
            postData: formData,
            fetcher: auth.signUp,
            toastSuccess: 'Successfully Signed Up',
            toastErr: 'Something went wrong.',
            onSuccess: () => { router.push('/user') }
        })
    }


    return (
        <Container>
            {err?.non_field_errors && <Alert my="2" borderRadius="md" status="error">
                <AlertIcon />
                <AlertDescription>{err?.non_field_errors}</AlertDescription>
            </Alert>}

            <form onSubmit={handleSignUp}>
                <FormInput
                    isRequired
                    label="Username"
                    name="username"
                    handleChange={handleFormChange}
                    inputType="text"
                    errors={err?.username}
                />
                <FormInput
                    isRequired
                    label="Email"
                    name="email"
                    handleChange={handleFormChange}
                    inputType="email"
                    errors={err?.email}
                />
                <FormInput
                    isRequired
                    label="Password"
                    name="password1"
                    handleChange={handleFormChange}
                    inputType="password"
                    errors={err?.password1}
                />
                <FormInput
                    isRequired
                    label="Confirm Password"
                    name="password2"
                    handleChange={handleFormChange}
                    inputType="password"
                    errors={err?.password2}
                />
                <Button mb="4" disabled={auth.isAuthenticated} isLoading={loading} colorScheme="teal" type="submit">Sign Up</Button>
            </form>

            <Text fontSize="sm">Already have an account? <NextLink href="/login"><Link color="teal">Login here</Link></NextLink></Text>
        </Container >
    )
}

export default Login
