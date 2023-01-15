import { Grid, Stack } from "@mui/material";
import { useContext, useState } from "react";
import {
  audioCtx,
  MixerContext,
} from "../../providers/AudioProvider/AudioProvider";
import CrossFader from "../../shared/Fader/CrossFader";
import Fader from "../../shared/Fader/Fader";

const Mixer = () => {
  const { channels } = useContext(MixerContext);
  const [faderLevels, setFaderLevels] = useState<{
    [key: string]: { level: number };
  }>({ A: { level: 0 }, B: { level: 0 } });

  const changeVolume = (value: number, selector: string) => {
    channels?.map((channel) => {
      if (channel.selector === selector) {
        channel.volumeNode.gain.value = value;
      }
    });
    setFaderLevels((prevFaderLevels) => {
      return { ...prevFaderLevels, [selector]: { level: value } };
    });
  };

  return (
    <>
      <Stack
        sx={{ height: 100 }}
        spacing={1}
        direction="row"
        justifyItems={"center"}
      >
        {channels?.map((channel) => (
          <Fader
            key={channel.selector}
            changePosition={(e: number) => changeVolume(e, channel.selector)}
            position={faderLevels[channel.selector].level}
          />
        ))}
      </Stack>
      <Grid justifyContent={"center"}>
        <CrossFader label="cross" />
      </Grid>
    </>
  );
};

export default Mixer;
