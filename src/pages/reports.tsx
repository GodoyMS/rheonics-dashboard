import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { GetServerSidePropsContext } from "next";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { DataTable } from "@/components/dashboard/data-table";
import data from "@/constants/data.json";
import { ModernChartCards } from "@/components/dashboard/chart-cards";
import Head from "next/head";
export default function Home() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 md:px-8">
        <ModernChartCards />
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      layout: "user",
      title: "Reports",
    },
  };
}
