import Slider from "@mui/material/Slider";

type Props = {
  label?: string;
  min?: number;
  max?: number;
  changePosition: (value: number) => void;
  position?: number;
  disabled?: boolean;
};

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
      <Slider
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
