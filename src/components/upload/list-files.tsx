import { useFileGLBContext } from "@/context/fileGlbContext";
import React from "react";
import { Button } from "../ui/button";
import { Icon3dCubeSphere } from "@tabler/icons-react";
import { motion } from "framer-motion";

const ListGLBFiles = () => {
  const { filesList, setSelectedFile, selectedFile } = useFileGLBContext();

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <h2 className="font-semibold text-xl">Uploaded files</h2>
      <div className="flex flex-col gap-2 w-full pt-6">
        {filesList.map((e) => (
          <Button
            key={e.id}
            onClick={() => setSelectedFile(e)}
            variant={selectedFile?.id === e.id ? "secondary" : "ghost"}
            className="flex h-14 flex-col justify-start items-start px-4"
          >
            <div className="w-full flex justify-start items-center line-clamp-1 gap-4">
              <Icon3dCubeSphere />
              {e.original_filename}
            </div>
            <div className="w-full text-xs text-start font-extralight pl-8 text-muted-foreground">
              {e.size_mb} MB
            </div>
          </Button>
        ))}
      </div>
    </motion.div>
  );
};

export default ListGLBFiles;
