import { FormControl, Input, Textarea, FormErrorMessage, FormErrorIcon, FormLabel, InputGroup, InputRightElement } from "@chakra-ui/react"

type props = {
    errors: string[] | undefined
    label: string
    name: string
    // TODO change type of event so it accepts both input and textarea
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    inputType: React.HTMLInputTypeAttribute | 'textarea'
    isRequired: boolean
}

export const FormInput = ({ isRequired, label, errors, name, handleChange, inputType }: props) => {
    return (
        <FormControl mb="4" isInvalid={errors && true} isRequired={isRequired}>
            <FormLabel>{label}</FormLabel>
            <InputGroup>
                {inputType == 'textarea' ? (
                    <Textarea
                        name={name}
                        errorBorderColor='red.500'
                        onChange={handleChange}
                        resize='vertical'
                    />
                ) : (
                    <Input
                        name={name}
                        errorBorderColor="red.500"
                        onChange={handleChange}
                        type={inputType}
                    />
                )}
                <InputRightElement children={<FormErrorIcon color="red.400" />} />
            </InputGroup>
            {errors?.map(msg => (
                <FormErrorMessage>{msg}</FormErrorMessage>
            ))}
        </FormControl>
    )
}

export default FormInput
