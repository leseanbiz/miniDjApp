import { styled } from "@mui/material";
import Slider from "@mui/material/Slider";

type Props = {
  label?: string;
  min?: number;
  max?: number;
  changePosition: (value: number) => void;
  position?: number;
  disabled?: boolean;
};

const StyledFader = styled(Slider)({
  color: "black", //color of the slider between thumbs
  "& .MuiSlider-thumb": {
    width: "25px",
    height: "10px",
    borderRadius: 0,
    backgroundColor: "black", //color of thumbs
  },
  "& .MuiSlider-rail": {
    color: "black",
    backgroundColor: "gray", ////color of the slider outside  teh area between thumbs
  },
  "& .MuiSlider-track": {
    color: "black",
    backgroundColor: "gray", ////color of the slider outside  teh area between thumbs
  },
});

const Fader = ({
  min = 0,
  max = 1,
  label = "",
  changePosition,
  position,
  disabled = false,
}: Props) => {
  return (
    <>
      <p>{label}</p>
      <StyledFader
        aria-label="Vertical Fader"
        orientation="vertical"
        step={0.001}
        marks
        min={min}
        max={max}
        disabled={disabled}
        value={position}
        valueLabelDisplay="auto"
        onChange={(_, value) => changePosition(value as number)}
      />
    </>
  );
};

export default Fader;
