import { Alert, AlertDescription, AlertIcon, Box, Button, Container, Link, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import { useAuth } from '../../auth/context';
import FormInput from '../../components/Form/CustomInput';
import useForm from '../../utils/useForm';

type forgotPasswordErrorResponse = {
    email?: string[]
    non_field_errors?: string[]
}

const ForgotPassword: NextPage = () => {
    const { resetPassword } = useAuth()
    const { handleFormPost, err, loading } = useForm()

    const [email, setEmail] = React.useState('')
    const [sent, setSent] = React.useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleSubmit = async () => {
        await handleFormPost<forgotPasswordErrorResponse, { email: string }>({
            postData: { email },
            fetcher: resetPassword,
            toastSuccess: 'Email sent!',
            toastErr: 'Something went wrong.',
        })
    }


    return (
        <Container>
            {err?.non_field_errors && <Alert my="2" borderRadius="md" status="error">
                <AlertIcon />
                <AlertDescription>{err.non_field_errors}</AlertDescription>
            </Alert>}
            <Box visibility={!sent ? 'visible' : 'hidden'}>
                <form>
                    <FormInput
                        isRequired
                        label='Email'
                        name="email"
                        inputType="email"
                        handleChange={handleChange}
                        errors={err?.email}
                    />
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
