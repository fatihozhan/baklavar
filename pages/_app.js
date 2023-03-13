import "@/styles/globals.scss";
import Layout from "../components/layout";
import { Space_Grotesk } from "@next/font/google";
import { useSpring, animated } from "@react-spring/web";
import Head from "next/head";
import "@/styles/nprogress.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import NProgress from "nprogress";
import AdminLayout from "@/components/adminLayout";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistStore } from "redux-persist";
const space = Space_Grotesk({
  subsets: ["latin-ext"],
  weight: ["400", "500", "600", "700"],
});

let persistor = persistStore(store);

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
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {router.pathname.includes("/admin") ? (
            <>
              <AdminLayout>
                <Component {...pageProps} />
              </AdminLayout>
            </>
          ) : (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </PersistGate>
      </Provider>
    </>
  );
}
