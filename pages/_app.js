import "@/styles/globals.scss";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/layout";
import { Space_Grotesk } from "@next/font/google";
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const space = Space_Grotesk({
  subsets: ["latin-ext"],
  weight: ["400", "500", "600", "700"],
});

let persistor = persistStore(store);

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => NProgress.start());
    router.events.on("routeChangeComplete", () => NProgress.done());
    router.events.on("routeChangeError", () => NProgress.done());
  }, []);

  return (
    <>
      <Head></Head>
      <SessionProvider session={session}>
        <Provider store={store}>
          <ToastContainer/>
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
      </SessionProvider>
    </>
  );
}
