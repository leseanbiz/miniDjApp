import { Grid } from "@mui/material";
import { useContext, useState } from "react";
import { MixerContext } from "../../providers/AudioProvider/AudioProvider";
import CrossFader from "../../shared/components/Fader/CrossFader";
import Fader from "../../shared/components/Fader/Fader";
import Knob from "../../shared/components/Knob/Knob";

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
      return value;
    });
    setFaderLevels((prevFaderLevels) => {
      return { ...prevFaderLevels, [selector]: { level: value } };
    });
  };

  return (
    <>
      <Grid container>
        <Grid
          container
          justifyContent={"space-around"}
          style={{ minHeight: "80px", marginBottom: "50px" }}
        >
          <Grid item xs={2} justifyContent="center">
            {channels && channels[0] ? (
              <Fader
                changePosition={(e: number) =>
                  changeVolume(e, channels[0].selector)
                }
                position={faderLevels[channels[0].selector].level}
              />
            ) : (
              <Fader disabled changePosition={() => console.log("test")} />
            )}
          </Grid>
          {/* <Knob
          size={100}
          numTicks={125}
          degrees={180}
          min={1}
          max={100}
          value={0}
          styled={false}
          onChange={(e: any) => console.log("onChange", e)}
          /> */}
          <Grid item xs={2} justifyContent="center">
            {channels && channels[1] ? (
              <Fader
                changePosition={(e: number) =>
                  changeVolume(e, channels[1].selector)
                }
                position={faderLevels[channels[1].selector].level}
              />
            ) : (
              <Fader disabled changePosition={() => console.log("test")} />
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid container justifyContent={"center"}>
        <Grid item xs={6}>
          <CrossFader label="cross" />
        </Grid>
      </Grid>
    </>
  );
};

export default Mixer;
