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

const useForm = () => {
    const toast = useToast()

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
        handleFormPost
    }

}
export default useForm
