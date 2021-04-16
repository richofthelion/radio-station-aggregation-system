import React, { useMemo } from 'react';
import styled from 'styled-components/macro';

import { TuneInStationData } from 'models/TuneInModel';
import StationTile from 'components/station-tile/StationTile';

//
// --- Types ---

export interface StationListProps {
  readonly listName: string;
  readonly stationList: TuneInStationData[];
}

//
// --- Styled Components ---

const StyledListName = styled.h2`
  text-transform: capitalize;
`;

const FlexList = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

//
// --- StationList Component ---

export const StationList: React.FunctionComponent<StationListProps> = (props) => {
  const { listName, stationList } = props;

  console.log('stationList', stationList);

  const renderedStationTiles = useMemo(
    () =>
      stationList.map((station) => {
        const { id, imgUrl, name } = station;

        return (
          <StationTile id={id} imgUrl={imgUrl} name={name} key={`station-id-${id}`} />
        );
      }),
    [stationList]
  );

  return (
    <>
      <StyledListName>{listName}</StyledListName>
      <FlexList className="station-list" data-component="StationList">
        {renderedStationTiles}
      </FlexList>
    </>
  );
};

export default StationList;
