// import { ChartAreaInteractive } from "@/components/chart-area-interactive"
// import { DataTable } from "@/components/data-table"
// import { SectionCards } from "@/components/section-cards"
// import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "../global/sidebar";
import { AppSidebar } from "../global/app-sidebar";
import { SiteHeader } from "../global/site-header";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // Choose the weights you need
  variable: '--font-poppins',
})
export default function Layout({ children,title }: { children: React.ReactNode,title:string }) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 14)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset  >
        <SiteHeader  title={title}/>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            {children}
            {/* <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div> */}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
