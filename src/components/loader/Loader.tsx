import React, { useMemo } from 'react';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//
// --- Types ---

interface LoaderProps {
  readonly pageLevelLoader?: boolean;
}

//
// --- Styled Components ---

const StyledPageLevelLoader = styled(FontAwesomeIcon)`
  display: block;
  position: fixed;
  z-index: 99;
  top: 50%;
  right: 50%;
  margin-right: -48px;
  margin-top: -48px;
`;

const StyledLocalLoader = styled(FontAwesomeIcon)`
    z-index: 99;
`;

export const Loader: React.FunctionComponent<LoaderProps> = (props) => {
  const renderLoader = useMemo(() => props.pageLevelLoader ? (
    <StyledPageLevelLoader size='6x' icon="spinner" spin />
  ) : (
    <StyledLocalLoader size='2x' icon="spinner" spin />
  ), [props.pageLevelLoader]);

  return (renderLoader);
}

export default Loader;
