import { useRouter } from "next/router";
import en from "@/public/locale/en.js";
import vi from "@/public/locale/vi.js";

const useTrans = () => {
  const { locale } = useRouter();

  const trans = locale === "vi" ? vi : en;

  return trans;
};

export default useTrans;
