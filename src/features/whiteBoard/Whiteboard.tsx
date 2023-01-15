import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@liveblocks/redux";
import Rectangle from "./Rectangle";
import {
  insertRectangle,
  deleteShape,
  onCanvasPointerUp,
  onCanvasPointerMove,
  selectShapes,
  IInitialState,
} from "./whiteBoardSlice";
import { client, RootState } from "../../app/store";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const roomId: string = "redux-whiteboard";

export const Whiteboard = () => {
  // move selectors to slice
  const shapes = useAppSelector((state: RootState) => state.whiteboard.shapes);
  const isLoading = useAppSelector(
    (state: any) => state.liveblocks.isStorageLoading
  );
  const others = useAppSelector((state: any) => state.liveblocks.others);
  const selectedShape = useAppSelector((state: any) => state.selectedShape);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(actions.enterRoom(roomId));
    // {
    //   shapes: {},
    // }

    return () => {
      dispatch(actions.leaveRoom(roomId));
    };
  }, [dispatch]);

  if (isLoading) {
    return <div className="loading">Loading</div>;
  }

  return (
    <>
      <div
        className="canvas"
        onPointerMove={(e) => {
          e.preventDefault();
          dispatch(onCanvasPointerMove({ x: e.clientX, y: e.clientY }));
        }}
        onPointerUp={() => {
          dispatch(onCanvasPointerUp());
        }}
      >
        {Object.entries(shapes).map(([shapeId, shape]) => {
          let selectionColor = "transparent";

          if (selectedShape === shapeId) {
            selectionColor = "blue";
          } else if (
            others.some((user: any) => user.presence?.selectedShape === shapeId)
          ) {
            selectionColor = "green";
          }
          return (
            <Rectangle
              key={shapeId}
              id={shapeId}
              shape={shape}
              selectionColor={selectionColor}
            />
          );
        })}
      </div>
      <div className="toolbar">
        <button onClick={() => dispatch(insertRectangle())}>Rectangle</button>
        <button
          onClick={() => dispatch(deleteShape())}
          disabled={selectedShape == null}
        >
          Delete
        </button>
        <button onClick={() => client.getRoom(roomId).history.undo()}>
          Undo
        </button>
        <button onClick={() => client.getRoom(roomId || "").history.redo()}>
          Redo
        </button>
      </div>
    </>
  );
};
