import React, { Suspense, useMemo } from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { iconOpacity } from 'styles/icon';
import Image from 'components/image/Image';
import Loader from 'components/loader/Loader';

//
// --- Types ---

export interface StationTileProps {
  readonly id: string;
  readonly stationPage?: boolean;
  readonly imgUrl: string;
  readonly name: string;
}

interface StyledStationTileProps {
  readonly width?: string;
  readonly stationPage?: boolean;
}

//
// --- Styled Components ---

const StyledTileImage = styled(Image)`
  height: auto;
  padding-bottom: 5px;
`;

const StyledTileName = styled.span<StyledStationTileProps>`
  color: black;
  font-weight: bold;
  font-size: ${(props) => (props.stationPage ? '24px' : '16px')};
`;

const FlexTile = styled.div<StyledStationTileProps>`
  max-width: ${(props) => props.width};
  display: flex;
  height: auto;
  flex-direction: column;
  position: relative;
  margin: 0px 25px;
  margin-bottom: 15px;
`;

const StyledLink = styled(Link)`
  ${iconOpacity}
  &:hover > .play-icon {
    opacity: 0.6;
  }
`;

const PlayIcon = styled(FontAwesomeIcon)`
  opacity: 0;
  transition: 0.5s;
  z-index: 9;
  left: 34px;
  top: 36px;
  font-size: 32px;
  color: black;
  position: absolute;
`;

//
// --- StationTile Component ---

export const StationTile: React.FunctionComponent<StationTileProps> = (props) => {
  const { id, stationPage, imgUrl, name } = props;
  const width = stationPage ? '160px' : '100px';

  const tileImage = useMemo(
    () => (
      <>
        <StyledTileImage width={width} imgUrl={imgUrl} alt={name} />
        <PlayIcon className="play-icon" size="1x" icon="play" />
      </>
    ),
    [name, imgUrl, width]
  );

  return (
    <FlexTile width={width} className="station-tile" data-component="StationTile">
      <Suspense fallback={<Loader />}>
        {stationPage ? tileImage : <StyledLink to={`/radio/${id}`}>{tileImage}</StyledLink>}
        <StyledTileName stationPage={stationPage}>{name}</StyledTileName>
      </Suspense>
    </FlexTile>
  );
};

export default StationTile;
