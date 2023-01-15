import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type ISelectedTrack = "A" | "B";

//TODO: break tracks into objects containing all state
export type IInitialMixerState = {
  trackA: string;
  trackB: string;
  trackAVolume: number;
  trackBVolume: number;
  faderPosition: number;
  selectedDeck: string;
};

const initialMixerState: IInitialMixerState = {
  trackB: "",
  trackA: "",
  trackAVolume: 0,
  trackBVolume: 0,
  faderPosition: 0,
  selectedDeck: "A",
};

const mixerSlice = createSlice({
  name: "mixer",
  initialState: initialMixerState,
  reducers: {
    changeSelectedTrack: (
      state: IInitialMixerState,
      action: PayloadAction<ISelectedTrack>
    ) => {
      state.selectedDeck = action.payload;
    },
    setTrackA: (state: IInitialMixerState, action: PayloadAction<string>) => {
      state.trackA = action.payload;
    },
    setTrackB: (state: IInitialMixerState, action: PayloadAction<string>) => {
      state.trackB = action.payload;
    },
    changeTrackAVolume: (
      state: IInitialMixerState,
      action: PayloadAction<number>
    ) => {
      state.trackAVolume = action.payload;
    },
    changeTrackBVolume: (
      state: IInitialMixerState,
      action: PayloadAction<number>
    ) => {
      state.trackBVolume = action.payload;
    },
    changeFaderPosition: (
      state: IInitialMixerState,
      action: PayloadAction<number>
    ) => {
      state.faderPosition = action.payload;
    },
  },
});

export const {
  changeTrackAVolume,
  changeTrackBVolume,
  changeFaderPosition,
  changeSelectedTrack,
  setTrackA,
  setTrackB,
} = mixerSlice.actions;

export const selectLevels = ({ mixer }: RootState) => {
  return {
    trackAVolume: mixer.trackAVolume,
    trackBVolume: mixer.trackBVolume,
    faderPosition: mixer.faderPosition,
  };
};

export const selectSelectedDeck = ({ mixer }: RootState) => mixer.selectedDeck;

export const selectTrackA = ({ mixer }: RootState) => mixer.trackA;
export const selectTrackB = ({ mixer }: RootState) => mixer.trackB;

export default mixerSlice.reducer;
