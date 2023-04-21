import { styled } from "@mui/system";
import { useState } from "react";
import "./knob.css";
type Props = {
  degrees: number;
  size: number;
  min: number;
  max: number;
  value: number;
  numTicks: number;
  styled: boolean;
  onChange: any;
};

const getDeg = ({ cX, cY, pts, startAngle, endAngle }: any) => {
  const x = cX - pts.x;
  const y = cY - pts.y;
  let deg = (Math.atan(y / x) * 180) / Math.PI;
  if ((x < 0 && y >= 0) || (x < 0 && y < 0)) {
    deg += 90;
  } else {
    deg += 270;
  }
  let finalDeg = Math.min(Math.max(startAngle, deg), endAngle);
  return finalDeg;
};

const convertRange = (
  oldMin: number,
  oldMax: number,
  newMin: number,
  newMax: number,
  oldValue: number
) => {
  return ((oldValue - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin;
};

const renderTicks = ({
  fullAngle,
  numTicks,
  size,
  margin,
  startAngle,
  endAngle,
}: any) => {
  let ticks = [];
  const incr = fullAngle / numTicks;
  const sizeAndMargin = margin + size / 2;
  for (let deg = startAngle; deg <= endAngle; deg += incr) {
    const tick = {
      deg: deg,
      tickStyle: {
        height: size + 10,
        left: size - 1,
        top: size + 2,
        transform: "rotate(" + deg + "deg)",
        transformOrigin: "top",
      },
    };
    ticks.push(tick);
  }
  return ticks;
};

const Knob = ({
  degrees,
  size,
  min,
  max,
  value,
  styled,
  numTicks,
  onChange,
}: Props) => {
  const fullAngle = degrees;
  const startAngle = (360 - degrees) / 2;
  const endAngle = startAngle + degrees;
  const margin = size * 0.15;
  console.log("initDegree", min, max, startAngle, endAngle, value);
  const [currentDeg, setCurrentDeg] = useState(
    Math.floor(convertRange(min, max, startAngle, endAngle, value))
  );
  const startDrag = (e: any) => {
    e.preventDefault();
    const knob = e.target.getBoundingClientRect();
    const pts = {
      x: knob.left + knob.width / 2,
      y: knob.top + knob.height / 2,
    };

    const moveHandler = (e: any) => {
      setCurrentDeg(
        getDeg({ cX: e.clientX, cY: e.clientY, pts, startAngle, endAngle })
      );
      console.log(currentDeg === startAngle, currentDeg, startAngle);
      if (currentDeg === startAngle) setCurrentDeg(currentDeg - 1);
      let newValue = Math.floor(
        convertRange(startAngle, endAngle, min, max, currentDeg)
      );
      setCurrentDeg(currentDeg);
      onChange(newValue);
    };
    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", (e) => {
      document.removeEventListener("mousemove", moveHandler);
    });
  };
  const dcpy = (o: any) => {
    return JSON.parse(JSON.stringify(o));
  };
  let kStyle = {
    width: size,
    height: size,
  };
  let iStyle = dcpy(kStyle);
  let oStyle = dcpy(kStyle);
  oStyle.margin = margin;
  if (styled) {
    oStyle.backgroundImage =
      "radial-gradient(100% 70%,hsl(210, " +
      currentDeg +
      "%, " +
      currentDeg / 5 +
      "%),hsl(" +
      Math.random() * 100 +
      ",20%," +
      currentDeg / 36 +
      "%))";
  }
  iStyle.transform = "rotate(" + currentDeg + "deg)";
  return (
    <div className="knob" style={kStyle}>
      <div className="ticks">
        {renderTicks({
          fullAngle,
          numTicks,
          size,
          margin,
          startAngle,
          endAngle,
        }).map((tick, i) => (
          <div
            key={i}
            className={"tick" + (tick.deg <= currentDeg ? " active" : "")}
            style={tick.tickStyle}
          />
        ))}
      </div>
      <div className="knob outer" style={oStyle} onMouseDown={startDrag}>
        <div className="knob inner" style={iStyle}>
          <div className="grip" />
        </div>
      </div>
    </div>
  );
  //   return (
  //       <KnobOuter>
  //           <KnobTicks>

  //           </KnobTicks>
  //     </KnobOuter>
  //   )
};

export default Knob;
