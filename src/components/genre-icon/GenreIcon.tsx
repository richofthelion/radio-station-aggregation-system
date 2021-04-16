import React from 'react';
import styled from 'styled-components/macro';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { ContentGenreType, FontAwesomeGenreIconMapping } from 'models/TuneInModel';

//
// --- Types ---

export interface GenreIconProps {
  readonly genre: ContentGenreType;
}

//
// --- Styled Components ---

const StyledIcon = styled(FontAwesomeIcon)`
  margin-bottom: 16px;
  border-radius: 50%;
  padding: 32px;
  background-color: lightblue;
`;

const StyledGenreName = styled.span`
  color: black;
  font-weight: bold;
  font-size: 16px;
  text-transform: capitalize;
`;

//
// --- GenreIcon Component ---

export const GenreIcon: React.FunctionComponent<GenreIconProps> = (props) => {
  const { genre } = props;

  return (
    <>
      <StyledIcon size="3x" icon={FontAwesomeGenreIconMapping[genre] as IconProp} />
      <StyledGenreName>{genre}</StyledGenreName>
    </>
  );
};

export default GenreIcon;
