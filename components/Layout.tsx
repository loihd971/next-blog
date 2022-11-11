import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { AppProps } from "next/app";
import ScrollToTop from "@/components/ScrollToTop";
import About from "./About";

export const Layout = ({ children }: (JSX.Element & AppProps) | any) => {
  return (
    <div>
      <Header />
      {children}
      <ScrollToTop />
      <About />
      <Footer />
    </div>
  );
};
