import "@/styles/globals.scss";
import Layout from "../components/layout";
import { Space_Grotesk } from "@next/font/google";
import Head from "next/head";
const space = Space_Grotesk({
  subsets: ["latin-ext"],
  weight: ["400", "500", "600", "700"],
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
