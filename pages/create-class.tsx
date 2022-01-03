import { Button, Container } from "@chakra-ui/react"
import React from "react"
import { useAuth } from "../auth/context"
import FormInput from "../components/Form/CustomInput"
import FileUpload from "../components/Form/FileUpload"
import useForm from "../utils/useForm"
import CustomNumberInput from '../components/Form/NumberInput'

type classData = {
    title: string
    description: string
    basic_price: number
    video: File | null
    images: FileList | File[] | null
}

type createClassError = {
    [key: string]: string[]
}

const CreateClass = (): JSX.Element => {
    const auth = useAuth()
    const { handleFormChange, handleFormPost, err, loading } = useForm()

    const defaultFormData = {
        title: '',
        description: '',
        basic_price: 0,
        video: null,
        images: null
    }

    const setPrice = (val: string) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            basic_price: parseInt(val) * 100
        }))
    }

    const [formData, setFormData] = React.useState<classData>(defaultFormData)

    const deleteFile = (name: string) => {
        // BUG does't work well two files have the same name
        if (formData.video?.name == name) {
            setFormData(prevData => ({ ...prevData, video: null }))
        } else {
            let keep: File[] = []
            if (formData.images) {
                for (let i = 0; i < formData.images.length; i++) {
                    if (name != formData.images[i].name) {
                        keep.push(formData.images[i])
                    }
                }
            }
            setFormData(prevData => ({ ...prevData, images: keep }))
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        handleFormChange<classData>({ event, defaultFormData, setFormData })
    }

    const handleFileChange = (e: React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>, multiple: boolean): void => {
        e.preventDefault()
        // handle dropped files as well as normal file input event
        let files = (e as React.DragEvent<HTMLDivElement>).dataTransfer?.files || (e as React.ChangeEvent<HTMLInputElement>).target?.files
        if (multiple == false) {
            console.log(files[0])
            setFormData(prevFormData => ({
                ...prevFormData,
                video: files[0]
            }))
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                images: files
            }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        await handleFormPost<createClassError, classData>({
            event: e,
            postData: formData,
            fetcher: async (postData) => await auth.authInstance.post('classes/', postData),
            toastErr: "Something went wrong",
            toastSuccess: `Successfully created your class '${formData.title}'!`
        })
    }


    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <FormInput
                    isRequired
                    label="Title"
                    name='title'
                    handleChange={handleChange}
                    inputType="text"
                    errors={err?.title}
                />
                <FormInput
                    isRequired
                    label="Description"
                    name='description'
                    handleChange={handleChange}
                    inputType='textarea'
                    errors={err?.description}
                />
                <CustomNumberInput
                    isRequired
                    handleChange={setPrice}
                    errors={err?.basic_price}
                    label="Base Price"
                    leftAddOn='$'
                />
                <FileUpload
                    label="Video Presentation"
                    name='video'
                    handleChange={(e) => handleFileChange(e, false)}
                    fileList={formData.video && [formData.video]}
                    deleteFile={deleteFile}
                    errors={err?.video}
                />
                <FileUpload
                    multiple
                    label='presentation Images'
                    name='images'
                    handleChange={(e) => handleFileChange(e, true)}
                    fileList={formData.images}
                    deleteFile={deleteFile}
                    errors={err?.images}
                />
                <Button type='submit' isLoading={loading}>Submit</Button>
            </form>
        </Container>
    )
}

export default CreateClass
