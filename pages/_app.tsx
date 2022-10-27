
import { SessionProvider } from "next-auth/react";
import { Layout } from "@/components/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.scss";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { AppProps } from "next/app";
import { darkTheme, lightTheme } from "@/utils/theme";
import { NextUIProvider, createTheme } from "@nextui-org/react";


function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: JSX.Element & AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <NextThemesProvider
          defaultTheme="light"
          attribute="class"
          value={{
            light: lightTheme.className,
            dark: darkTheme.className,
          }}
        >
          <NextUIProvider>
            <Layout>
              <Component {...pageProps} />
              <ToastContainer />
            </Layout>
          </NextUIProvider>
        </NextThemesProvider>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
