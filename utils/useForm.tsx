import { useToast } from '@chakra-ui/react'
import axios, { AxiosError } from 'axios'
import React from 'react'


type handleFormPostParams<PostDataType> = {
    event?: React.FormEvent
    postData: PostDataType,
    fetcher: (postData: PostDataType) => Promise<void>,
    toastSuccess?: string,
    toastErr?: string,
    onSuccess?: () => void,
    onFail?: () => void,
}

type handleFormChangeParams<formData> = {
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    defaultFormData: formData
    setFormData: (value: React.SetStateAction<formData>) => void
}

const useForm = () => {
    const toast = useToast()
    const [err, setErr] = React.useState<any>({})
    const [loading, setLoading] = React.useState(false)


    const handleFormChange = <formData,>(params: handleFormChangeParams<formData>) => {
        const { name, value } = params.event.target

        const formDataAllowedKeys = Object.keys(params.defaultFormData)
        if (!formDataAllowedKeys.includes(name)) {
            throw TypeError(`"${name}" not in "${formDataAllowedKeys}"`)
        }

        params.setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleFormPost = async<responseErrorType, PostDataType>(params: handleFormPostParams<PostDataType>) => {
        params.event && params.event.preventDefault()
        setLoading(true)
        try {
            await params.fetcher(params.postData)
            params.toastSuccess && toast({
                title: params.toastSuccess,
                duration: 2500,
                status: 'success',
                isClosable: true,
                position: 'top'
            })
            setLoading(false)
            params.onSuccess && params.onSuccess()

        } catch (err) {
            if (axios.isAxiosError(err)) {
                const responseError = err as AxiosError<responseErrorType>
                if (responseError && responseError.response) {
                    setErr(responseError.response.data)
                }
            }
            setLoading(false)
            params.toastErr && toast({
                title: params.toastErr,
                duration: 2500,
                status: 'error',
                isClosable: true,
                position: 'top'

            })
            params.onFail && params.onFail()
        }
    }


    return {
        handleFormChange,
        handleFormPost,
        err,
        loading
    }

}
export default useForm
