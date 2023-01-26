import "./App.css";
import { Whiteboard } from "./features/whiteBoard/Whiteboard";
import WebAudioTurntable from "./features/turntable/WebAudioTurntable";
import Mixer from "./features/mixer/Mixer";
import DeckSelector from "./shared/DeckSelector/DeckSelector";
import { Grid } from "@mui/material";
import AudioGraph from "./shared/AudioGraph/AudioGraph";
import ThemeViewer from "./shared/ThemeViewer/ThemeViewer";
import { Theme, ThemeProvider } from "@mui/system";
import { theme1 } from "./app/themes/theme1";
import { theme2 } from "./app/themes/theme2";
import { useAppSelector } from "./app/hooks";
import { selectCurrentTheme } from "./app/themeSlice";
const gridStyle = {
  bgcolor: "background.paper",
  border: "2px solid #000",
};
const themes: { [key: string]: Theme } = {
  theme1,
  theme2,
};
export default function App() {
  // TODO:
  // [BUG] - Load trackA, play trackA, load trackB, attempt to control trackA by volume / transport
  // [SPIKE] - what purpose does redux serve after needing to move all audio to context?
  const currentTheme = useAppSelector(selectCurrentTheme);
  return (
    <>
      <ThemeProvider theme={themes[currentTheme]}>
        {/* <AudioGraph /> */}
        <Grid container spacing={2}>
          {/* <Whiteboard /> */}

          <Grid xs={12} item style={gridStyle}>
            <DeckSelector />
          </Grid>
          <Grid xs={4} item style={gridStyle}>
            <WebAudioTurntable title="A" />
          </Grid>
          <Grid xs={4} item style={gridStyle}>
            <Mixer />
          </Grid>
          <Grid xs={4} item style={gridStyle}>
            <WebAudioTurntable title="B" />
          </Grid>
        </Grid>

        {/* <ThemeViewer /> */}
      </ThemeProvider>
    </>
  );
}
