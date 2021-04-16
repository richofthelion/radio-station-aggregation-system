import React, { useEffect, useMemo } from 'react';
import find from 'lodash/find';
import styled from 'styled-components/macro';
import { useParams } from 'react-router-dom';

import { TuneInStationData } from 'models/TuneInModel';
import Audio from 'components/audio/Audio';
import Layout from 'components/layout/Layout';
import StationTile from 'components/station-tile/StationTile';
import { useRecentStations, useStations } from 'providers/stations-provider/StationsProvider';

//
// --- Types ---

interface StationPageRouteParams {
  id: string;
}

//
// --- Styled Components ---

const StyledStationPage = styled.div`
  height: 100%;
`;

const StyledStationMetaData = styled.div`
  font-size: 14px;
  display: flex;
  flex-direction: column;
`;

const StyledMetaCategory = styled.div`
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
`;

const StyledDivider = styled.div`
  padding: 24px 0px;
`;

const StyledPageBreak = styled.hr`
  margin-top: 10px 0px;
  height: 2px;
  border: none;
  background-color: #f6f8f6;
`;

//
// --- HomePage Component ---

export const StationPage: React.FunctionComponent = () => {
  const { stations } = useStations();
  const { recentStations, setRecentStations } = useRecentStations();
  const { id } = useParams<StationPageRouteParams>();

  useEffect(() => {
    if (setRecentStations) {
      setRecentStations([
        id,
        ...recentStations.filter((stationId) => stationId !== id).slice(0, 4),
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const featuredStation = useMemo(
    (): TuneInStationData | undefined => find(stations, (station) => station.id === id),
    [id, stations]
  );

  if (!featuredStation) {
    return null;
  }

  const stationTags = featuredStation.tags?.map(tag => tag.charAt(0).toUpperCase() + tag.slice(1));

  return (
    <StyledStationPage className="station-page" data-component="StationPage">
      <Layout>
        <StationTile
          stationPage
          id={featuredStation.id}
          imgUrl={featuredStation.imgUrl}
          name={featuredStation.name}
        />
        <Audio streamUrl={featuredStation.streamUrl} />
        <StyledDivider>
          <StyledPageBreak />
        </StyledDivider>
        <StyledStationMetaData>
          <StyledMetaCategory>
            <span><strong>Description:</strong></span>
            <span>{featuredStation.description}</span>
          </StyledMetaCategory>
          <StyledMetaCategory>
            <span><strong>Genres:</strong></span>
            <span>{stationTags.join(', ')}</span>
          </StyledMetaCategory>
        </StyledStationMetaData>
      </Layout>
    </StyledStationPage>
  );
};

export default StationPage;
