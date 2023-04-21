import "./App.css";
import { Whiteboard } from "./features/whiteBoard/Whiteboard";
import WebAudioTurntable from "./features/turntable/WebAudioTurntable";
import Mixer from "./features/mixer/Mixer";
import DeckSelector from "./shared/components/DeckSelector/DeckSelector";
import { Card, Grid } from "@mui/material";

import AudioGraph from "./features/AudioGraph/AudioGraph";
import ThemeViewer from "./features/ThemeViewer/ThemeViewer";
import {
  // Theme,
  ThemeProvider,
} from "@mui/system";
// import { theme1 } from "./app/themes/theme1";
// import { theme2 } from "./app/themes/theme2";
// import { useAppSelector } from "./app/hooks";
// import { selectCurrentTheme } from "./app/themeSlice";
// import texture from "./metallic_texture.jpg";
import neumorphicTheme from "./app/themes/neumorphicTheme";

// const themes: { [key: string]: Theme } = {
//   theme1,
//   theme2,
// };

export default function App() {
  // TODO:
  // [BUG] - Load trackA, play trackA, load trackB, attempt to control trackA by volume / transport
  // [SPIKE] - what purpose does redux serve after needing to move all audio to context?
  // const currentTheme = useAppSelector(selectCurrentTheme);

  return (
    <>
      <ThemeProvider theme={neumorphicTheme}>
        <AudioGraph />
        <Grid
          container
          style={{
            //   backgroundRepeat: "contain",
            //   backgroundImage: `url(${texture})`,
            backgroundColor: neumorphicTheme.palette.background.paper,
            //   backgroundBlendMode: "luminosity",
          }}
        >
          <Whiteboard />

          <Grid xs={12} item>
            <DeckSelector />
          </Grid>
          <Grid xs={4} item>
            <Card>
              <WebAudioTurntable deckId="A" />
            </Card>
          </Grid>
          <Grid xs={4} item>
            <Card>
              <Mixer />
            </Card>
          </Grid>
          <Grid xs={4} item>
            <Card>
              <WebAudioTurntable deckId="B" />
            </Card>
          </Grid>
          {/* <Grid xs={12} item style={gridStyle}>
            <p>what goes here?</p>
          </Grid> */}
        </Grid>

        <ThemeViewer />
      </ThemeProvider>
    </>
  );
}
