import { Box, Center, Text, FormLabel, FormErrorMessage } from "@chakra-ui/react"
import InputFileList from './InputFileList'
import React from "react"

type props = {
    name: string
    label: string
    handleChange: (event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>) => void
    errors: string[] | undefined
    multiple?: boolean
    fileList: FileList | File[] | null;
    deleteFile: (name: string) => void
}

const FileUpload = ({ name, label, handleChange, multiple, errors, fileList, deleteFile }: props): JSX.Element => {

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    }

    const style: { [key: string]: React.CSSProperties } = {
        input: { opacity: '0', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }
    }

    return (
        <Box>
            <FormLabel>{label}</FormLabel>
            <Center
                width='100%'
                height='20'
                border='dashed 2px'
                borderColor={errors ? 'red.500' : 'whiteAlpha.300'}
                position='relative'
                borderRadius='lg'
                onDragOver={handleDragOver}
                onDrop={handleChange}
            >
                <Text>Drop file{multiple && 's'} or click here</Text>
                <input
                    style={style.input}
                    type="file"
                    name={name}
                    value=""
                    onChange={handleChange}
                    multiple={multiple ? multiple : false}
                />
            </Center>
            {/* BUG errors don't show up */}
            {errors?.map(msg => (
                <FormErrorMessage>{msg}</FormErrorMessage>
            ))}
            <InputFileList fileList={fileList} deleteFile={deleteFile} />
        </Box>

    )
}

export default FileUpload
