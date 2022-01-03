import { CloseButton } from "@chakra-ui/close-button";

type props = {
    fileList: FileList | File[] | null;
    deleteFile: (name: string) => void
};

const InputFileList = ({ fileList, deleteFile }: props): JSX.Element => {
    const list = (() => {
        let arr: string[] = [];
        if (fileList) {
            for (let i = 0; i < fileList.length; i++) {
                arr.push(fileList[i].name);
            }
        }
        return arr
    })();
    return (
        <ul>
            {list.map((name, index) => (
                <li key={name + index}>{name}<CloseButton onClick={() => deleteFile(name)} display='inline-block' /></li>
            ))}
        </ul>
    );
};

export default InputFileList;
