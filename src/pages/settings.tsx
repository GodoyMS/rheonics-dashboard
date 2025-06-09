import { GetServerSidePropsContext } from "next";
import StepFileViewer from "@/components/upload/step-file-viewer";
import { FileGLBProvider } from "@/context/fileGlbContext";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
     
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      layout: "user",
      title: "Settings",
    },
  };
}
