import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";
import { Layout } from "@/components/Layout";
import { ToastContainer } from "react-toastify";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import "../styles/globals.scss";

function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <NextUIProvider>
          <Layout>
            <Component {...pageProps} />
            <ToastContainer />
          </Layout>
        </NextUIProvider>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
