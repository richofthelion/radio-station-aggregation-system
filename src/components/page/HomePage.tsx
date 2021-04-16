import React, { useCallback, useMemo, useState } from 'react';
import { groupBy, orderBy } from 'lodash';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { iconOpacity } from 'styles/icon';
import { ContentGenreEnum, ContentGenreType, TuneInStationData } from 'models/TuneInModel';
import GenreIcon from 'components/genre-icon/GenreIcon';
import Layout from 'components/layout/Layout';
import Loader from 'components/loader/Loader';
import StationList from 'components/station-list/StationList';
import { useIsFetchingStations, useRecentStations, useStations } from 'providers/stations-provider/StationsProvider';

//
// --- Types ---

type GenreTagMap = Partial<{
  [key in ContentGenreType]: string[]
}>;

//
// --- Styled Components ---

const StyledHomePage = styled.div`
  height: 100%;
  overflow-y: auto;
`;

const StyledGenreIconList = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 40px;
`;

const StyledGenreIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 0px 14px;
  ${iconOpacity}
`;

const StyledIcon = styled(FontAwesomeIcon)`
  padding-right: 10px;
  ${iconOpacity}
`;

const StyledBackArrowText = styled.div`
  display: flex;
  align-items: center;
`;

//
// --- HomePage Component ---

export const HomePage: React.FunctionComponent = () => {
  const [selectedGenre, setSelectedGenre] = useState<ContentGenreType>();
  const { isFetchingStations } = useIsFetchingStations();
  const { stations } = useStations();
  const { recentStations } = useRecentStations();

  const genreList: ContentGenreType[] = Object.values(ContentGenreEnum);

  const runTaggingMap = useCallback(() => {
    const genreTagMap: GenreTagMap = {};

    const pushContentId = (station: TuneInStationData, genre: ContentGenreType) => {
      if (station.tags.includes(genre)) {
        if (genreTagMap[genre]) {
          genreTagMap?.[genre]?.push(station.id);
        } else {
          genreTagMap[genre] = [station.id];
        }
      }
    };

    stations.forEach(station => {
      genreList.forEach(genre => {
        pushContentId(station, genre);
      })
    });

    return genreTagMap;
  }, [genreList, stations]);

  const genreTagMap = useMemo((): GenreTagMap => runTaggingMap(), [runTaggingMap]);
  const activeGenreKeys = useMemo((): ContentGenreType[] => Object.keys(genreTagMap) as ContentGenreType[], [genreTagMap]);

  const activeGenreIconList = useMemo(() => activeGenreKeys.map((genre: ContentGenreType) => {
    return (
      <StyledGenreIconWrapper key={`${genre}-icon`}  onClick={() => setSelectedGenre(genre)}>
        <GenreIcon genre={genre} />
      </StyledGenreIconWrapper>
    )
  }), [activeGenreKeys, setSelectedGenre]);

  const createStationList = useCallback(
    (listIds?: string[]): TuneInStationData[] => {
      if (listIds) {
        const groupById = groupBy(stations, 'id');

        return listIds.map((id) => {
          return groupById[id][0];
        });
      }

      return [];
    },
    [stations]
  );
  const activeRecentStations = useMemo(
    (): TuneInStationData[] => createStationList(recentStations),
    [createStationList, recentStations]
  );
  const activePopularStations = useMemo(
    (): TuneInStationData[] => orderBy(stations, ['popularity'], ['desc']),
    [stations]
  );
  const activeGenreStations = useMemo(
    (): TuneInStationData[] => selectedGenre ? createStationList(genreTagMap[selectedGenre]) : [],
    [createStationList, genreTagMap, selectedGenre]
  );

  return (
    <StyledHomePage id="home" data-component="HomePage">
      <Layout>
        {isFetchingStations ? (
          <Loader pageLevelLoader />
        ) : (
          <>
            <h1>HOME</h1>
            {recentStations.length > 0 && (
              <StationList listName="Recent Stations" stationList={activeRecentStations} />
            )}
            <StationList listName="Most Popular Stations" stationList={activePopularStations.slice(0, 5)} />
            <h2>What Do You Want To Listen To?</h2>
            {selectedGenre ? (
              <>
                <StyledBackArrowText>
                  <StyledIcon size="2x" icon='long-arrow-alt-left' onClick={() => setSelectedGenre(undefined)}/>
                  See all Genres
                </StyledBackArrowText>
                <StationList listName={selectedGenre} stationList={activeGenreStations} />
              </>
            ) : (
              <StyledGenreIconList>
                {activeGenreIconList}
              </StyledGenreIconList>
            )}
          </>
        )}
      </Layout>
    </StyledHomePage>
  );
};

export default HomePage;
