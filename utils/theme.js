import { createTheme } from "@nextui-org/react";

export const lightTheme = createTheme({
  type: "light",
  theme: {
    colors: {
      red900: "white"
    },
  },
});

export const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {
      red900: "#001220"
    },
  },
});
