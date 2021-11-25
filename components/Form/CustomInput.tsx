import { FormControl, Input, FormErrorMessage, FormErrorIcon, FormLabel, InputGroup, InputRightElement } from "@chakra-ui/react"

type props = {
    errors: string[] | undefined
    label: string
    name: string
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    inputType: React.HTMLInputTypeAttribute
    isRequired: boolean
}

const FormInput = ({ isRequired, label, errors, name, handleChange, inputType }: props) => {
    return (
        <FormControl mb="4" isInvalid={errors && true} isRequired={isRequired}>
            <FormLabel>{label}</FormLabel>
            <InputGroup>
                <Input
                    name={name}
                    errorBorderColor="red.500"
                    onChange={handleChange}
                    type={inputType}
                />
                <InputRightElement children={<FormErrorIcon color="red.400" />} />
            </InputGroup>
            {errors?.map(msg => (
                <FormErrorMessage>{msg}</FormErrorMessage>
            ))}
        </FormControl>
    )
}

export default FormInput
