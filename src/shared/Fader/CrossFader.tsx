import { useContext, useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import { MixerContext } from "../../providers/AudioProvider/AudioProvider";

type Props = {
  label?: string;
  min?: number;
  max?: number;
  disabled?: boolean;
};

const CrossFader = ({
  label = "",
  min = 0,
  max = 1,
  disabled = false,
}: Props) => {
  const { createNewGainNode, channels } = useContext(MixerContext);
  const [faderPosition, setFaderPosition] = useState(0.5);

  useEffect(() => {
    if (createNewGainNode) {
      // [BUG] - loading trackA then trackB causes an extra gain node to be created on channel A
      // [BUG] - loading trackB first, causes some odd connection in the gain nodes
      channels?.map((channel) => {
        createNewGainNode(channel.source, channel.id);
      });
    }
  }, [channels]);

  // TODO:
  // use selectors (A,B,C,D) to label the tracks
  // add buttons to set any source to either side of the fader?
  const crossFade = (value: number) => {
    // TODO: needs a lot of tightening up
    setFaderPosition(value);
    if (channels && channels.length > 1) {
      if (value < 0.5 && value > 0) {
        channels[1].volumeNode.gain.value = value * 2;
      }
      if (value > 0.5 && value < 1) {
        channels[0].volumeNode.gain.value = (1 - value) * 2;
      }
    }
  };

  return (
    <>
      <p>{label}</p>
      <Slider
        aria-label="Cross Fader"
        orientation="horizontal"
        defaultValue={0.5}
        step={0.001}
        marks
        min={min}
        max={max}
        disabled={disabled}
        value={faderPosition}
        valueLabelDisplay="auto"
        onChange={(_, value) => crossFade(value as number)}
      />
    </>
  );
};

export default CrossFader;
