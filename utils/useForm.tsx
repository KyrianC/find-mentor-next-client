import { useToast } from '@chakra-ui/react'
import axios, { AxiosError } from 'axios'


type handleFormPostParams<responseErrorType, PostDataType> = {
    event?: React.FormEvent
    postData: PostDataType,
    fetcher: (postData: PostDataType) => Promise<void>,
    toastSuccess?: string,
    toastErr?: string,
    setErr: (value: React.SetStateAction<responseErrorType | null>) => void,
    setLoading: (value: React.SetStateAction<boolean>) => void,
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

    const handleFormPost = async<responseErrorType, PostDataType>(params: handleFormPostParams<responseErrorType, PostDataType>) => {
        params.event && params.event.preventDefault()
        params.setLoading(true)
        try {
            await params.fetcher(params.postData)
            params.toastSuccess && toast({
                title: params.toastSuccess,
                duration: 2500,
                status: 'success',
                isClosable: true,
                position: 'top'
            })
            params.setLoading(false)
            params.onSuccess && params.onSuccess()

        } catch (err) {
            if (axios.isAxiosError(err)) {
                const responseError = err as AxiosError<responseErrorType>
                if (responseError && responseError.response) {
                    params.setErr(responseError.response.data)
                }
            }
            params.setLoading(false)
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
    }

}
export default useForm
