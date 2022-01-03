import { FormControl, FormErrorMessage, NumberInput, FormLabel, InputGroup, InputLeftAddon, NumberDecrementStepper, NumberIncrementStepper, NumberInputField, NumberInputStepper } from "@chakra-ui/react"
import React from "react"

type props = {
    isRequired: boolean
    leftAddOn?: string
    errors: string[] | undefined
    handleChange: (valueAsString: string, valueAsNumber: number) => void
    label: string
}

const CustomNumberInput = ({ isRequired, leftAddOn, errors, handleChange, label }: props): JSX.Element => {
    return (
        <FormControl isRequired={isRequired}>
            <FormLabel>{label}</FormLabel>
            <InputGroup>
                {leftAddOn && (
                    <InputLeftAddon children={leftAddOn} />
                )}
                <NumberInput
                    isInvalid={errors ? true : false}
                    onChange={handleChange}
                    min={0}
                    precision={2}
                >
                    <NumberInputField borderLeftRadius={leftAddOn && 0} />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </InputGroup>
            {/* BUG errors don't show up */}
            {errors?.map(msg => (
                <FormErrorMessage>{msg}</FormErrorMessage>
            ))}
        </FormControl>
    )
}

export default CustomNumberInput
