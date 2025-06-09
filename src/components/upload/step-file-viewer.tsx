import { FileInfo } from "@/interfaces/file.interface";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "../ui/button";
import { Download, File, Info, Layers, Trash, Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";

import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import ModelViewer from "./model-viewer";
import { BACKEND_BASE_URL } from "@/config/configEnv";
import { toast } from "sonner";
import axios from "axios";
import { useFileGLBContext } from "@/context/fileGlbContext";
import ListGLBFiles from "./list-files";

export default function StepFileViewer() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const {
    setSelectedFile,
    selectedFile,
    getFiles,
    filesList,
    setFilesList,
    isFullScreen,
  } = useFileGLBContext();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file || !(file.name.endsWith(".stp") || file.name.endsWith(".step")))
      return;

    setIsUploading(true);
    setUploadProgress(10);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(`${BACKEND_BASE_URL}/convert`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percent);
          }
        },
      });

      const data = res.data as FileInfo;
      setUploadProgress(100);
      setSelectedFile(data);
      await getFiles();
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setIsUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/step": [".stp", ".step"],
    },
    multiple: false,
  });

  const resetViewer = () => {
    setSelectedFile(null);
    setUploadProgress(0);
  };

  const deleteFileByid = async (id: string) => {
    if (!id) return;

    toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          const start = Date.now();

          await axios.delete(`${BACKEND_BASE_URL}/glb-files/${id}`);

          const elapsed = Date.now() - start;
          const delay = Math.max(0, 500 - elapsed); // 800ms min
          setSelectedFile(null);
          const newFiles = filesList.filter((e) => e.id !== id);
          setFilesList(newFiles);
          setTimeout(resolve, delay);
        } catch (err) {
          reject(err);
        }
      }),
      {
        loading: "Deleting 3D model...",
        success: "3D model successfully deleted",
        error: "Failed to delete 3D model",
        closeButton: true,
      }
    );
  };

  const handleDownload = () => {
    if (!selectedFile) return;
    const link = document.createElement("a");
    link.href = selectedFile?.glb_url;
    link.download = selectedFile?.glb_url;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="  p-6">
      <div className="w-full space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">3D STEP File Viewer</h1>
            <p className="text-muted-foreground">
              Upload and analyze your .stp/.step CAD files
            </p>
          </div>
          {selectedFile && (
            <Button onClick={resetViewer} variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Upload New File
            </Button>
          )}
        </div>

        <div className="flex flex-col gap-6 md:grid md:grid-cols-12">
          {filesList.length > 0 && (
            <div className=" md:col-span-3">
              <ListGLBFiles />
            </div>
          )}

          <div
            className={
              filesList.length > 0 ? " md:col-span-9" : " md:col-span-12"
            }
          >
            {!selectedFile ? (
              /* Upload Area */
              <Card className="border-2 border-dashed">
                <CardContent className="p-12">
                  <div
                    {...getRootProps()}
                    className={`text-center cursor-pointer transition-colors ${
                      isDragActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    <input {...getInputProps()} />
                    <div className="mx-auto w-12 h-12 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <Upload className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {isDragActive
                        ? "Drop your STEP file here"
                        : "Upload STEP File"}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Drag and drop your .stp or .step file here, or click to
                      browse
                    </p>
                    <Button>
                      <File className="w-4 h-4 mr-2" />
                      Choose File
                    </Button>
                    <div className="mt-4 text-xs text-muted-foreground">
                      Supported formats: .stp, .step (Max size: 100MB)
                    </div>
                  </div>

                  {isUploading && (
                    <div className="mt-6 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Processing file...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} />
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              /* Main Viewer Interface */
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div
                  className={isFullScreen ? "lg:col-span-4" : "lg:col-span-3"}
                >
                  <ModelViewer />
                </div>

                {/* File Information Panel */}

                {!isFullScreen && (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Info className="w-5 h-5" />
                          File Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <div className="text-sm font-medium text-muted-foreground">
                            Original file
                          </div>
                          <div className="font-mono text-sm break-all">
                            {selectedFile.original_filename}
                          </div>
                        </div>

                        <div>
                          <div className="text-sm font-medium text-muted-foreground">
                            Converted file
                          </div>
                          <div className="font-mono text-sm break-all">
                            {selectedFile.converted_filename}
                          </div>
                        </div>

                        <Separator />

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm font-medium text-muted-foreground">
                              Size
                            </div>
                            <div className="text-sm">
                              {selectedFile.size_mb} MB
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-muted-foreground">
                              Type
                            </div>
                            <Badge variant="secondary">GLB</Badge>
                          </div>
                        </div>

                        <div>
                          <div className="text-sm font-medium text-muted-foreground">
                            Created at
                          </div>
                          <div className="text-sm">
                            {new Date(
                              selectedFile.created_at
                            ).toISOString().slice(0,16)}
                          </div>
                        </div>
                        <Separator />
                        <div>
                          <div className="text-sm font-medium text-muted-foreground">
                            Url
                          </div>
                          <div className="font-mono text-xs break-all">
                            {selectedFile.glb_url}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Layers className="w-5 h-5" />
                          Actions
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <Button
                          onClick={handleDownload}
                          className="w-full"
                          variant="outline"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Export File
                        </Button>
                        <Button
                          onClick={() => deleteFileByid(selectedFile.id)}
                          className="w-full"
                          variant="destructive"
                        >
                          <Trash className="w-4 h-4 mr-2" />
                          Delete File
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
