import { ChangeEvent, useContext, useId, useRef } from "react";
import { MixerContext } from "../../../providers/AudioProvider/AudioProvider";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { IconButton } from "@mui/material";

type Props = {
  destination: string;
};

const FileUpload = ({ destination }: Props) => {
  const hiddenFileInput = useRef(null);
  const { createNewChannel } = useContext(MixerContext);
  const id = useId();
  const loadAudioFile = (input: ChangeEvent<HTMLInputElement>) => {
    if (input.target.files![0]) {
      const sourceAux = URL.createObjectURL(input.target.files![0]);
      createNewChannel && createNewChannel(sourceAux, id);
    }
  };

  return (
    <>
      <IconButton color="primary" component="label">
        <input
          id={`deck${destination}`}
          type="file"
          accept="audio/*"
          ref={hiddenFileInput}
          style={{ display: "none" }}
          onChange={(e) => loadAudioFile(e)}
          onLoad={() => "Load successful!"}
          onError={() => "Error!"}
        />
        <UploadFileIcon />
      </IconButton>
    </>
  );
};

export default FileUpload;
