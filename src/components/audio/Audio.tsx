import React from 'react';


//
// --- Types ---

export interface AudioProps {
  readonly streamUrl: string;
}

//
// --- Audio Component ---

export const Audio: React.FunctionComponent<AudioProps> = (props) => {
  const { streamUrl } = props;

  return (
    <audio controls autoPlay>
      <source src={streamUrl} />
      Your browser does not support the audio tag.
    </audio>
  );
};

export default Audio;
