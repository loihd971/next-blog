import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { AppProps } from "next/app";
import ScrollToTop from "@/components/ScrollToTop";

export const Layout = ({ children }: (JSX.Element & AppProps) | any) => {
  return (
    <div>
      <Header />
      {children}
      <ScrollToTop />
      <Footer />
    </div>
  );
};
