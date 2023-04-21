import { Button, Grid, styled } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { MixerContext } from "../../providers/AudioProvider/AudioProvider";
import Fader from "../../shared/components/Fader/Fader";
import FileUpload from "../../shared/components/FileUpload/FileUpload";
import TimeDisplay from "./TimeDisplay";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

type Props = {
  deckId: string;
};

const TransportButton = styled(Button)({
  color: "black",
  height: "25px",
  width: "25px",
});

const WebAudioTurntable = ({ deckId }: Props) => {
  const { audioCtx, channels } = useContext(MixerContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

  const audioSrc = channels?.find(
    (channel) => channel.selector === deckId
  )?.element;

  // hack to get duration to display without having to play/stop.
  useEffect(() => {
    audioSrc?.addEventListener("canplaythrough", () =>
      setDuration(audioSrc.duration)
    );
    return () => {
      audioSrc?.removeEventListener("canplaythrough", () => setDuration(0));
    };
  }, [audioSrc]);

  const playSound = () => {
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    setIsPlaying(true);
    setIsPaused(false);
    setIsStopped(false);
    audioSrc?.play();
  };
  const pauseSound = () => {
    setIsPlaying(false);
    setIsPaused(true);
    setIsStopped(false);
    audioSrc?.pause();
  };
  const stopSound = () => {
    setIsPlaying(false);
    setIsPaused(false);
    setIsStopped(true);
    audioSrc?.pause();
    audioSrc!.currentTime = 0;
  };
  const changePlaybackRate = (value: any) => {
    setPlaybackRate(value);
    audioSrc!.playbackRate = playbackRate;
  };

  console.log(deckId);
  return (
    <Grid container justifyContent="center" alignContent="center">
      <Grid
        container
        justifyContent="space-between"
        xs={12}
        // style={{ height: "20px" }}
      >
        <Grid item>
          <p>{deckId}</p>
        </Grid>
        <Grid item>
          <FileUpload destination={deckId} />
        </Grid>
      </Grid>
      <Grid item>
        <Grid item xs={12}>
          <TimeDisplay
            duration={duration}
            isPlaying={isPlaying}
            isPaused={isPaused}
            isStopped={isStopped}
          />
        </Grid>
      </Grid>
      <Grid
        container
        xs={12}
        direction="column"
        alignContent="space-between"
        justifyContent={"flex-end"}
      >
        <Grid item xs={4}>
          {isPlaying ? (
            <TransportButton disabled={!audioSrc} onClick={() => pauseSound()}>
              <PauseIcon />
            </TransportButton>
          ) : (
            <TransportButton disabled={!audioSrc} onClick={() => playSound()}>
              <PlayArrowIcon />
            </TransportButton>
          )}
        </Grid>
        <Grid item xs={4}>
          <TransportButton disabled={!audioSrc} onClick={() => stopSound()}>
            Cue
          </TransportButton>
        </Grid>

        <Grid item xs={4} style={{ height: "500px", marginBottom: "50px" }}>
          <Fader
            changePosition={changePlaybackRate}
            min={0}
            max={2}
            position={playbackRate}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WebAudioTurntable;
