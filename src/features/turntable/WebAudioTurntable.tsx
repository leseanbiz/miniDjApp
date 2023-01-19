import { useContext, useEffect, useState } from "react";
import { MixerContext } from "../../providers/AudioProvider/AudioProvider";
import Fader from "../../shared/Fader/Fader";
import FileUpload from "../../shared/FileUpload/FileUpload";
import TimeDisplay from "./TimeDisplay";

type Props = {
  title: string;
};

const WebAudioTurntable = ({ title }: Props) => {
  const { audioCtx, channels } = useContext(MixerContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

  const audioSrc = channels?.find(
    (channel) => channel.selector === title
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
  return (
    <>
      <p>{title}</p>
      <FileUpload destination={title} />
      {!audioSrc ? (
        <p>load a song</p>
      ) : (
        <>
          <button disabled={!audioSrc} onClick={() => playSound()}>
            Play
          </button>
          <button disabled={!audioSrc} onClick={() => pauseSound()}>
            Pause
          </button>
          <button disabled={!audioSrc} onClick={() => stopSound()}>
            Stop
          </button>
        </>
      )}
      {duration ? (
        <TimeDisplay
          duration={duration}
          isPlaying={isPlaying}
          isPaused={isPaused}
          isStopped={isStopped}
        />
      ) : null}
      <Fader
        changePosition={changePlaybackRate}
        min={0}
        max={2}
        position={playbackRate}
      />
    </>
  );
};

export default WebAudioTurntable;
