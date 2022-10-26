import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const Layout = ({ children }: any) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};
