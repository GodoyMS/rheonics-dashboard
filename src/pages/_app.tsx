import Layout from "@/components/layout/layout";
import { ThemeProvider } from "@/providers/theme-provider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  if (pageProps.layout === "user") {
    return (
      <ThemeProvider>
        <Layout title={pageProps.title}>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    );
  }
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
