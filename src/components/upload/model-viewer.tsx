"use client";

import { Canvas, useThree } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  Environment,
  Stats,
  Bounds,
  useBounds,
} from "@react-three/drei";
import {
  forwardRef,
  Suspense,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useFileGLBContext } from "@/context/fileGlbContext";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Eye,
  Maximize,
  Minimize,
  RotateCcw,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { Button } from "../ui/button";

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

type ControlsActions = {
  zoomIn: () => void;
  zoomOut: () => void;
  reset: () => void;
  fitToView: () => void;
};

const CanvasWrapper = forwardRef<ControlsActions>((props, ref) => {
  const controlsRef = useRef<any>(null);
  const boundsApi = useBounds();
  const { camera } = useThree();

  useImperativeHandle(ref, () => ({
    zoomIn() {
      controlsRef.current?.dollyOut(1.2);
      controlsRef.current?.update();
    },
    zoomOut() {
      controlsRef.current?.dollyIn(1.2);
      controlsRef.current?.update();
    },
    reset() {
      controlsRef.current?.reset();
      camera.position.set(0, 0, 8);
    },
    fitToView() {
      boundsApi.refresh().fit();
    },
  }));

  return <OrbitControls ref={controlsRef} makeDefault />;
});

const ModelViewer = () => {
  const { selectedFile, setIsFullScreen, isFullScreen } = useFileGLBContext();
  const controlsRef = useRef<ControlsActions>(null);

  if (!selectedFile) return null;

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            3D Viewer
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => controlsRef.current?.fitToView()}
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => controlsRef.current?.zoomIn()}
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => controlsRef.current?.zoomOut()}
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              className=" hidden md:block"
              variant="outline"
              onClick={() => setIsFullScreen((prev) => !prev)}
            >
              {isFullScreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 h-full">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Suspense fallback={null}>
            <Bounds fit clip observe>
              <Model url={selectedFile.glb_url} />
              <CanvasWrapper ref={controlsRef} />
            </Bounds>
          </Suspense>
          <Environment preset="studio" />
        </Canvas>
      </CardContent>
    </Card>
  );
};

export default ModelViewer;
