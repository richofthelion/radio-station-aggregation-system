import React from 'react';
import styled from 'styled-components/macro';
import { useImage } from 'react-image'

//
// --- Types ---

export interface ImageProps {
  readonly alt: string;
  readonly imgUrl: string;
  readonly width: string;
}

interface StyledImageProps {
  readonly width: string;
}

//
// --- Styled Components ---

const StyledImage = styled.img<StyledImageProps>`
  max-width: ${(props) => (props.width)};
  padding-bottom: 6px;
`;


//
// --- StationTile Component ---

export const Image: React.FunctionComponent<ImageProps> = (props) => {
  const { alt, imgUrl, width } = props;

  const { src } = useImage({
    srcList: imgUrl,
  })

  return (
    <StyledImage alt={alt} src={src} width={width} />
  );
};

export default Image;
