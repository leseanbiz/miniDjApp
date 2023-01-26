import { createTheme, Theme, ThemeOptions } from "@mui/material";

const palette = {
  color1: {
    hex: "#b4aeb2",
    hsl: "hsl(320,4%,69%)",
    rgb: "rgb(180,174,178)",
    light: "#e6e0e4",
    main: "#b4aeb2",
    dark: "#847f83",
    contrastText: "#000000",
  },
  color2: {
    hex: "#e4dee0",
    hsl: "hsl(340,10%,88%)",
    rgb: "rgb(228,222,224)",
    light: "#e6e0e4",
    main: "#b4aeb2",
    dark: "#847f83",
    contrastText: "#000000",
  },
  color3: {
    hex: "#84e9d6",
    hsl: "hsl(169,70%,72%)",
    rgb: "rgb(132,233,214)",
    light: "#b8ffff",
    main: "#84e9d6",
    dark: "#50b6a5",
    contrastText: "#000000",
  },
  color4: {
    hex: "#3f898d",
    hsl: "hsl(183,38%,40%)",
    rgb: "rgb(63,137,141)",
    light: "#70b9bd",
    main: "#3f898d",
    dark: "#005c60",
    contrastText: "#ffffff",
  },
  color5: {
    hex: "#2f404d",
    hsl: "hsl(206,24%,24%)",
    rgb: "rgb(47,64,77)",
    light: "#596b79",
    main: "#2f404d",
    dark: "#071a25",
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

export const theme1: Theme = createTheme(themeOptions);
