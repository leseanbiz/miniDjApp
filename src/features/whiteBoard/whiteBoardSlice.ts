import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const COLORS = ["#DC2626", "#D97706", "#059669", "#7C3AED", "#DB2777"];

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function getRandomColor() {
  return COLORS[getRandomInt(COLORS.length)];
}
export type Shape = {
  x: number;
  y: number;
  fill?: string;
};

export type IInitialState = {
  shapes: { [key: string]: Shape };
  selectedShape: {
    shapeId: string;
  };
  isDragging: Boolean;
  // liveblocks: any;
};

const initialState: IInitialState = {
  shapes: {},
  selectedShape: { shapeId: "" },
  isDragging: false,
  // liveblocks: {},
};

const whiteboardSlice = createSlice({
  name: "whiteboard",
  initialState,
  reducers: {
    insertRectangle: (state: IInitialState) => {
      //TODO: change to use react18 useId?
      const shapeId = Date.now().toString();
      const shape = {
        x: getRandomInt(300),
        y: getRandomInt(300),
        fill: getRandomColor(),
      };
      state.shapes[shapeId] = shape;
      state.selectedShape.shapeId = shapeId;
    },
    onShapePointerDown: (state, action: PayloadAction<string>) => {
      state.selectedShape.shapeId = action.payload;
      state.isDragging = true;
    },
    onCanvasPointerUp: (state: IInitialState) => {
      state.isDragging = false;
    },
    onCanvasPointerMove: (state, action: PayloadAction<Shape>) => {
      if (state.isDragging && state.selectedShape) {
        state.shapes[state.selectedShape.shapeId].x = action.payload.x - 50;
        state.shapes[state.selectedShape.shapeId].y = action.payload.y - 50;
      }
    },
    deleteShape: (state: IInitialState) => {
      if (state.selectedShape) {
        delete state.shapes[state.selectedShape.shapeId];
        state.selectedShape.shapeId = "";
      }
    },
  },
});

export const {
  insertRectangle,
  onShapePointerDown,
  deleteShape,
  onCanvasPointerUp,
  onCanvasPointerMove,
} = whiteboardSlice.actions;

export const selectShapes = (state: IInitialState) => state.shapes;
export const selectedShape = (state: RootState) =>
  state.whiteboard.selectedShape;
// export const isLoading = (state: RootState) =>
//   state.whiteboard.liveblocks.isStorageLoading;

export default whiteboardSlice.reducer;
