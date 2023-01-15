import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import whiteboardReducer, {
  IInitialState,
} from "../features/whiteBoard/whiteBoardSlice";
import mixerReducer from "../features/mixer/mixerSlice";
import { createClient } from "@liveblocks/client";
import { liveblocksEnhancer } from "@liveblocks/redux";

export const client: any = createClient({
  publicApiKey:
    "pk_dev_COOXUcRaQ6RF3MMBuqYmaV8WcDP7x8hGIudekcjbNuF3nyg1P4jSRm7viOp4oj92",
});

const liveblocksEnhancerConfig = {
  client,
  presenceMapping: { selectedShape: true },
  storageMapping: { shapes: true },
};

export const store = configureStore({
  reducer: {
    whiteboard: whiteboardReducer,
    mixer: mixerReducer,
  },
  enhancers: [liveblocksEnhancer<IInitialState>(liveblocksEnhancerConfig)],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
