import { BACKEND_BASE_URL } from "@/config/configEnv";
import { FileInfo } from "@/interfaces/file.interface";
import axios from "axios";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

interface FileGLBContextProps {
  selectedFile: FileInfo | null;
  setSelectedFile: Dispatch<SetStateAction<FileInfo | null>>;
  filesList: FileInfo[];
  setFilesList: Dispatch<SetStateAction<FileInfo[]>>
  getFiles:()=>Promise<void>
  isFullScreen: boolean
  setIsFullScreen: Dispatch<SetStateAction<boolean>>

}

const FileGLBContext = createContext<FileGLBContextProps | null>(null);

const FileGLBProvider = ({ children }: { children: ReactNode }) => {
  const [selectedFile, setSelectedFile] = useState<FileInfo | null>(null);
  const [filesList, setFilesList] = useState<FileInfo[]>([]);
  const[isFullScreen,setIsFullScreen]=useState<boolean>(false)
  const getFiles = async () => {
    try {
      const { data } = await axios.get(BACKEND_BASE_URL + "/glb-files");
      setFilesList(data);
    } catch (error) {

    }
  };
  useEffect(() => {getFiles()}, []);

  return (
    <FileGLBContext.Provider
      value={{
        selectedFile,
        setSelectedFile,
        filesList,
        setFilesList,
        getFiles,
        isFullScreen,
        setIsFullScreen
      }}
    >
      {children}
    </FileGLBContext.Provider>
  );
};
const useFileGLBContext = () => {
  const context = useContext(FileGLBContext);
  if (!context) {
    throw new Error("Error");
  }
  return context;
};
export { FileGLBProvider, useFileGLBContext };
