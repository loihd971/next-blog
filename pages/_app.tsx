import { SessionProvider } from "next-auth/react";
import { Layout } from "@/components/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.scss";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { AppProps } from "next/app";
import { darkTheme, lightTheme } from "@/utils/theme.js";
import { NextUIProvider, globalCss } from "@nextui-org/react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import 'react-quill/dist/quill.snow.css';

// fix for popover not keep position with parent container
const globalStyles = globalCss({
  ".nextui-popover-content-container": {
    position: "fixed !important",
    top: "64px !important",
  },
});

globalStyles();
// fix for popover not keep position with parent container

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: JSX.Element & AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <NextThemesProvider
          defaultTheme="system"
          attribute="class"
          value={{
            light: lightTheme.className,
            dark: darkTheme.className,
          }}
        >
          <NextUIProvider>
            <Layout >
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
