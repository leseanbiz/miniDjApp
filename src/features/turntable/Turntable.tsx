import { useEffect } from "react";
import { useAudioPlayer } from "react-use-audio-player";
import TimeDisplay from "./TimeDisplay";

type Props = {
  audioSrc: string;
};
const Turntable = ({ audioSrc }: Props) => {
  const {
    togglePlayPause,
    ready,
    loading,
    load,
    playing,
    stop,
    ended,
    stopped,
    error,
    play,
    player,
    duration,
    volume,
  } = useAudioPlayer();

  useEffect(() => {
    if (audioSrc && player?.state() !== "loaded") {
      load({
        src: audioSrc,
        format: "mp3",
        autoplay: false,
        onend: () => console.log("onEnd"),
        onstop: () => console.log("onStop"),
        onplay: () => console.log("onPlay"),
        onpause: () => console.log("onPause"),
      });
    }
  }, [audioSrc, load, player]);

  // TODO:
  // SPRITES ARE CUE POINTS!!?

  const changeVolume = (value: number) => volume(value);

  const onCue = () => {
    if (playing) {
      stop();
      play();
    }
  };
  player?.stereo();
  if (error) return <div>Error</div>;
  if ((!ready && !loading) || !audioSrc) return <div>No audio to play</div>;

  if (loading) return <div>Loading audio</div>;
  return (
    <div>
      <div>
        <div>
          <div>
            <input
              type="range"
              id="volume"
              name="volume"
              step=".001"
              onChange={(e) => changeVolume(Number(e.target.value) / 100)}
            />
          </div>
          <TimeDisplay
            duration={duration}
            isPlaying={playing}
            isPaused={!playing && !stopped}
            isStopped={stopped || ended}
          />
          <button onClick={togglePlayPause}>
            {playing ? "Pause" : "Play"}
          </button>
          <button onClick={() => stop()}>stop</button>
          <button onClick={() => onCue()}>Cue</button>
        </div>
      </div>
    </div>
  );
};

export default Turntable;
