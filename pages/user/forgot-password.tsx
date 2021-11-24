import { Alert, AlertDescription, AlertIcon, Box, Button, Container, FormControl, FormErrorIcon, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement, Link, Text, useToast } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import { useAuth } from '../../auth/context';

type errorResponse = {
    email?: string[]
    non_field_errors?: string[]
}

const ForgotPassword: NextPage = () => {
    const { resetPassword } = useAuth()
    const toast = useToast()

    const [email, setEmail] = React.useState('')
    const [loading, setLoading] = React.useState(false);
    const [sent, setSent] = React.useState(false)
    const [error, setError] = React.useState<errorResponse | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleSubmit = async () => {
        try {
            setLoading(true)
            await resetPassword({ email })
            setLoading(false)
            setSent(true)
            toast({
                title: 'Email sent!',
                status: 'success',
                duration: 2500,
                position: 'top'
            })
        } catch (err) {
            setError(err.response.data)
            setLoading(false)
        }
    }

    return (
        <Container>
            {error?.non_field_errors && <Alert my="2" borderRadius="md" status="error">
                <AlertIcon />
                <AlertDescription>{error.non_field_errors}</AlertDescription>
            </Alert>}
            <Box visibility={!sent ? 'visible' : 'hidden'}>
                <form method=" f" id="" action="">
                    <FormControl isInvalid={error?.email && true} mb="4" isRequired>
                        <FormLabel>Email</FormLabel>
                        <InputGroup>
                            <Input errorBorderColor="red.500" type="email" onChange={handleChange} />
                            <InputRightElement children={<FormErrorIcon color="red.400" />} />
                        </InputGroup>
                        {error?.email?.map(err => (
                            <FormErrorMessage>{err}</FormErrorMessage>
                        ))}
                    </FormControl>
                    <Button type="submit" onClick={handleSubmit} isLoading={loading} colorScheme="teal">
                        Reset Password
                    </Button>
                </form>
            </Box>
            <Box textAlign="center" visibility={sent ? 'visible' : 'hidden'}>
                <Text fontWeight="bold" fontSize="3xl">You can now check your mails for a password reset link!</Text>
                <br />
                <Text>Did'n receive email? <Link color="teal" onClick={() => setSent(false)}>Try again</Link></Text>
            </Box>
        </Container>
    )
}

export default ForgotPassword