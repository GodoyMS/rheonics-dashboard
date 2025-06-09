import Head from "next/head";

import { GetServerSidePropsContext } from "next";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { DataTable } from "@/components/dashboard/data-table";
import data from "@/constants/data.json";
import { ModernChartCards } from "@/components/dashboard/chart-cards";
export default function Home() {
  return (
    <div>
       <Head>
        <title>Dashboard</title>
      </Head>
      <div className=" px-4 md:px-8 pt-4 ">
        <h1 className=" font-bold text-2xl">Good afternoon, Manager</h1>
        <p className=" text-muted-foreground">
          Welcome to your manager dashboard
        </p>
      </div>
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 md:px-8">
        <StatsCards />
        <ModernChartCards />
        <DataTable data={data} />
      </div>
    </div>
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
