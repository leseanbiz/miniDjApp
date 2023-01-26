import { createTheme, ThemeOptions } from "@mui/material";

const palette = {
  color1: {
    hex: "#52a0c3",
    hsl: "hsl(199,48%,54%)",
    rgb: "rgb(82,160,195)",
    light: "#86d1f6",
    main: "#52a0c3",
    dark: "#107192",
    contrastText: "#000000",
  },
  color2: {
    hex: "#afd7fa",
    hsl: "hsl(208,88%,83%)",
    rgb: "rgb(175,215,250)",
    light: "#e2ffff",
    main: "#afd7fa",
    dark: "#7ea6c7",
    contrastText: "#000000",
  },
  color3: {
    hex: "#dfa8cb",
    hsl: "hsl(322,46%,77%)",
    rgb: "rgb(223,168,203)",
    light: "#ffdafe",
    main: "#dfa8cb",
    dark: "#ad799a",
    contrastText: "#000000",
  },
  color4: {
    hex: "#925c7d",
    hsl: "hsl(323,23%,47%)",
    rgb: "rgb(146,92,125)",
    light: "#c38aac",
    main: "#925c7d",
    dark: "#633151",
    contrastText: "#ffffff",
  },
  color5: {
    hex: "#051d2f",
    hsl: "hsl(206,81%,10%)",
    rgb: "rgb(5,29,47)",
    light: "#304458",
    main: "#051d2f",
    dark: "#000006",
    contrastText: "#ffffff",
  },
};

export const themeOptions: ThemeOptions = {
  palette: {
    // primary: {
    //   main: "#cacad6",
    //   light: "#718792",
    //   dark: "#1c313a",
    // },
    // secondary: {
    //   main: "#86929f",
    //   light: "#ffffff",
    //   dark: "#9bcca1",
    // },
    // info: {
    //   main: "#708090",
    //   light: "#ffffff",
    //   dark: "#cdcdcf",
    // },
    // background: {
    //   default: "#455a64",
    // },
    // text: {
    //   primary: "#dad8d8",
    //   secondary: "#000000",
    // },
    // ...palette,
  },
  customColors: palette,
};

export const theme2 = createTheme(themeOptions);
