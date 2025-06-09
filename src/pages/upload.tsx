import { GetServerSidePropsContext } from "next";
import StepFileViewer from "@/components/upload/step-file-viewer";
import { FileGLBProvider } from "@/context/fileGlbContext";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>3D Model</title>
      </Head>
      <FileGLBProvider>
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 md:px-8">
          {/* <ModelViewer/> */}
          <StepFileViewer />
        </div>
      </FileGLBProvider>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      layout: "user",
      title: "Dashboard",
    },
  };
}
