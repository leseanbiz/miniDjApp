import { Theme, ThemeOptions, Palette } from "@mui/material/styles";

type IColors = "color1" | "color2" | "color3" | "color4" | "color5";
type IExtendedColor = {
  hex?: string;
  hsl?: string;
  rgb?: string;
  light: string;
  main: string;
  dark: string;
  contrastText: string;
};
type ICustomColors = {
  color1: IExtendedColor;
  color2: IExtendedColor;
  color3: IExtendedColor;
  color4: IExtendedColor;
  color5: IExtendedColor;
};
declare module "@mui/material/styles" {
  interface Theme {
    customColors: ICustomColors;
  }

  interface ThemeOptions {
    customColors: ICustomColors;
  }
  //   export function createTheme(options?: CustomThemeOptions): CustomTheme;
}
declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    color1?: PaletteColorOptions;
    color2?: PaletteColorOptions;
    color3?: PaletteColorOptions;
    color4?: PaletteColorOptions;
    color5?: PaletteColorOptions;
  }
  interface PaletteOptions {
    color1?: PaletteColorOptions;
    color2?: PaletteColorOptions;
    color3?: PaletteColorOptions;
    color4?: PaletteColorOptions;
    color5?: PaletteColorOptions;
  }
}
