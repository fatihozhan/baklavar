import "@/styles/globals.scss";
import Layout from "../components/layout";
import { Space_Grotesk } from "@next/font/google";
import Head from "next/head";
import "@/styles/nprogress.css";
import { useRouter } from "next/router";
import { useEffect } from "react";

import NProgress from "nprogress";
const space = Space_Grotesk({
  subsets: ["latin-ext"],
  weight: ["400", "500", "600", "700"],
});

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => NProgress.start());
    router.events.on("routeChangeComplete", () => NProgress.done());
    router.events.on("routeChangeError", () => NProgress.done());
  }, []);

  return (
    <>
      <Head></Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
