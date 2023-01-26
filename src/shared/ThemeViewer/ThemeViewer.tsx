import {
  Button,
  Grid,
  Paper,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { IColors } from "../../app/material-ui";
import { changeTheme, selectCurrentTheme } from "../../app/themeSlice";

const ThemeViewer = () => {
  const theme: Theme = useTheme();
  const dispatch = useAppDispatch();
  const currentTheme: string = useAppSelector(selectCurrentTheme);
  console.log({ theme });
  console.log("Object.keys", Object.keys(theme.customColors));
  const customColors = Object.keys(theme.customColors).map((color: string) => {
    const currentColor = theme.customColors[color as IColors];
    console.log({ color }, currentColor);
    return (
      <div key={color}>
        <p>{color}</p>
        <Grid container justifyContent={"center"} spacing={2}>
          <Grid item xs={3}>
            <Paper
              sx={{
                maxWidth: "100px",
                minHeight: "100px",
                background: currentColor.light,
              }}
            >
              <Typography sx={{ color: currentColor.contrastText }}>
                {currentColor.light}
              </Typography>
            </Paper>
            <Typography>light</Typography>
          </Grid>
          <Grid item xs={3}>
            <Paper
              sx={{
                maxWidth: "100px",
                minHeight: "100px",
                background: currentColor.main,
              }}
            >
              <Typography sx={{ color: currentColor.contrastText }}>
                {currentColor.main}
              </Typography>
            </Paper>
            <Typography>main</Typography>
          </Grid>
          <Grid item xs={3}>
            <Paper
              sx={{
                maxWidth: "100px",
                minHeight: "100px",
                background: currentColor.dark,
              }}
            >
              <Typography sx={{ color: currentColor.contrastText }}>
                {currentColor.dark}
              </Typography>
            </Paper>
            <Typography>dark</Typography>
          </Grid>
        </Grid>
      </div>
    );
  });
  console.log(customColors);
  return (
    <div>
      customColors
      <Button
        style={{ backgroundColor: theme.customColors?.color1.light }}
        onClick={() =>
          dispatch(changeTheme(currentTheme === "theme1" ? "theme2" : "theme1"))
        }
      >
        Change Theme
      </Button>
      {customColors}
    </div>
  );
};

export default ThemeViewer;
