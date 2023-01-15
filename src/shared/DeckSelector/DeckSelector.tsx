import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  changeSelectedTrack,
  selectSelectedDeck,
} from "../../features/mixer/mixerSlice";

const DeckSelector = () => {
  const dispatch = useAppDispatch();
  const selectedDeck = useAppSelector(selectSelectedDeck);
  return (
    <div>
      <button onClick={() => dispatch(changeSelectedTrack("A"))}>A</button>
      <button onClick={() => dispatch(changeSelectedTrack("B"))}>B</button>
      <p>{`Selected Deck: ${selectedDeck}`}</p>
    </div>
  );
};

export default DeckSelector;
