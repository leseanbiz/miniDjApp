import "./App.css";
import { Whiteboard } from "./features/whiteBoard/Whiteboard";
import WebAudioTurntable from "./features/turntable/WebAudioTurntable";
import Mixer from "./features/mixer/Mixer";
import DeckSelector from "./shared/DeckSelector/DeckSelector";
import { Grid } from "@mui/material";
import { useContext } from "react";
import { MixerContext } from "./providers/AudioProvider/AudioProvider";

const gridStyle = {
  bgcolor: "background.paper",
  border: "2px solid #000",
};

export default function App() {
  // TODO:
  // [BUG] - Load trackA, play trackA, load trackB, attempt to control trackA by volume / transport
  // [SPIKE] - what purpose does redux serve after moving all audio to context?
  const { audioCtx, channels } = useContext(MixerContext);

  return (
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
  );
}
