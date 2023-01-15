import React from "react";
// import "./App.css";
import { onShapePointerDown } from "./whiteBoardSlice";
import { useDispatch } from "react-redux";

type Props = {
  shape: any;
  selectionColor: any;
  id: any;
};

const Rectangle = ({ shape, selectionColor, id }: Props) => {
  const dispatch = useDispatch();

  return (
    <div
      className="rectangle"
      style={{
        transform: `translate(${shape.x}px, ${shape.y}px)`,
        backgroundColor: shape.fill ? shape.fill : "#CCC",
        borderColor: selectionColor,
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
        dispatch(onShapePointerDown(id));
      }}
    ></div>
  );
};

export default Rectangle;
