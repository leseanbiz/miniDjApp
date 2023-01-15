import { createContext, ReactNode, useState } from "react";

type Props = {
  children: ReactNode;
};

type ContextValue = {
  audioCtx: AudioContext;
  output: AudioDestinationNode;
  createNewChannel?: (audio: string, id: string) => Channel;
  createNewGainNode?: (
    source: MediaElementAudioSourceNode,
    id: string
  ) => {
    gainNode: GainNode;
  };
  channels?: Channel[];
};
// TODO: should return Channels object and functions
// How will created gain nodes be added to the channels object tree?
type Channels = { A: Channel; B: Channel; C: Channel; D: Channel };
export type Channel = {
  id: string;
  selector: string;
  audioElement: HTMLAudioElement;
  source: MediaElementAudioSourceNode;
  volumeNode: GainNode;
};
export type Selectors = "A" | "B" | "C" | "D";
// export type Channels = { [key: Selectors]: Channel };
export const audioCtx = new AudioContext();
export const output = audioCtx.destination;

const value: ContextValue = {
  audioCtx,
  output,
};
export const MixerContext = createContext(value);

export const MixerProvider = ({ children }: Props) => {
  const [channels, setChannels] = useState<Channel[] | []>([]);
  const selectors = ["A", "B", "C", "D"];
  // TODO:have a function for eq, gain, fx stack, may need a wet & dry output for a visualizer.
  // returning createNewGainNode separetely should allow adding gain nodes to existing audio sources that may already have gain nodes
  const createNewGainNode = (
    source: MediaElementAudioSourceNode,
    id: string
  ) => {
    const gainNode = audioCtx.createGain();
    gainNode.gain.value = 0;
    source.connect(gainNode).connect(output);
    return { gainNode };
  };

  const createNewChannel = (audioBlobUrl: string, id: string) => {
    const element = new Audio(audioBlobUrl);
    const elementSource = audioCtx.createMediaElementSource(element);
    const { gainNode } = createNewGainNode(elementSource, id);
    const channel = {
      id: id,
      selector: selectors[channels.length],
      audioElement: element,
      source: elementSource,
      volumeNode: gainNode,
    };
    setChannels((prev) => [...prev, channel]);
    // will return most recently generated audio sources and gain nodes
    return channel;
  };
  // will return a collection of all audioSources and gainNodes as well as setter functions
  const test = {
    ...value,
    createNewChannel,
    createNewGainNode,
    channels,
  };
  return <MixerContext.Provider value={test}>{children}</MixerContext.Provider>;
};
