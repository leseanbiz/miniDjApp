import { Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";

type Props = {
  duration: number;
  isPlaying: boolean;
  isPaused: boolean;
  isStopped: boolean;
  isEmpty?: boolean;
};

const TimeDisplay = ({
  duration,
  isPlaying,
  isPaused,
  isStopped,
  isEmpty,
}: Props) => {
  const initMinutes = Math.floor(duration / 60);
  const initSeconds = Math.floor(duration % 60);

  const [minutes, setMinutes] = useState(initMinutes);
  const [seconds, setSeconds] = useState(initSeconds);

  // const reset = (intervalId: any) => {
  //   clearInterval(intervalId);
  //   setMinutes(initMinutes);
  //   setSeconds(initSeconds);
  // };

  useEffect(() => {
    if (isEmpty) {
      setMinutes(0o0);
      setSeconds(0o0);
    }
    const timerInterval = setInterval(() => {
      if (!isPaused && isPlaying && !isStopped) {
        if (seconds > 0) {
          setSeconds((prev) => prev - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            // reset(timerInterval);
          } else {
            setMinutes((prev) => prev - 1);
            setSeconds(59);
          }
        }
      }
    }, 1000);
    // if (isStopped) {
    //   reset(timerInterval);
    // }
    return () => {
      clearInterval(timerInterval);
    };
  }, [
    isEmpty,
    isStopped,
    isPaused,
    isPlaying,
    seconds,
    minutes,
    // reset
  ]);

  return (
    <Grid container spacing={2}>
      <Grid item justifyContent="center">
        <Typography>
          {minutes < 10 ? `0${minutes}` : minutes} :{" "}
          {seconds < 10 ? `0${seconds}` : seconds}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default TimeDisplay;
