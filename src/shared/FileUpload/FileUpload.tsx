import { ChangeEvent, useContext, useId } from "react";
import { MixerContext } from "../../providers/AudioProvider/AudioProvider";
type Props = {
  destination: string;
};
const FileUpload = ({ destination }: Props) => {
  const { createNewChannel } = useContext(MixerContext);
  const id = useId();
  const loadAudioFile = (input: ChangeEvent<HTMLInputElement>) => {
    if (input.target.files![0]) {
      const sourceAux = URL.createObjectURL(input.target.files![0]);
      createNewChannel && createNewChannel(sourceAux, id);
    }
  };
  return (
    <div>
      FileUpload {destination}
      <input
        id="auInput"
        type="file"
        accept="audio/*"
        onChange={(e) => loadAudioFile(e)}
        onLoad={() => "Load successful!"}
      />
    </div>
  );
};

export default FileUpload;
