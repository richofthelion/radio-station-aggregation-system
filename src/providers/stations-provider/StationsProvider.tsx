import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import API from 'services/api';
import { TuneInStationData } from 'models/TuneInModel';

//
// --- Types ---

export type IsFetchingStationsContextType = {
  isFetchingStations: boolean;
  setIsFetchingStations?: Dispatch<SetStateAction<boolean>>;
};

export type StationsContextType = {
  stations: TuneInStationData[];
  setStations?: Dispatch<SetStateAction<TuneInStationData[]>>;
};

export type RecentStationsContextType = {
  recentStations: string[];
  setRecentStations?: Dispatch<SetStateAction<string[]>>;
};

//
// --- Helpers ---

const stationsInitialState: StationsContextType = { stations: [], setStations: undefined };
const isFetchingStationsContext: IsFetchingStationsContextType = { isFetchingStations: false, setIsFetchingStations: undefined };
const recentStationsInitialState: RecentStationsContextType = {
  recentStations: [],
  setRecentStations: undefined,
};

const StationsContext = createContext<StationsContextType>(stationsInitialState);
const IsFetchingStationsContext = createContext<IsFetchingStationsContextType>(isFetchingStationsContext);
const RecentStationsContext = createContext<RecentStationsContextType>(recentStationsInitialState);

const useIsFetchingStations = (): IsFetchingStationsContextType => {
  const context = useContext(IsFetchingStationsContext);

  if (!context) {
    throw new Error(`useIsFetchingStations must be used within a StationsProvider`);
  }

  return context;
};

const useStations = (): StationsContextType => {
  const context = useContext(StationsContext);

  if (!context) {
    throw new Error(`useStations must be used within a StationsProvider`);
  }

  return context;
};

const useRecentStations = (): RecentStationsContextType => {
  const context = useContext(RecentStationsContext);

  if (!context) {
    throw new Error(`useRecentStations must be used within a StationsProvider`);
  }

  return context;
};

//
// --- StationsProvider Component ---

const StationsProvider: React.FunctionComponent = ({ children }) => {
  const [stations, setStations] = useState<TuneInStationData[]>(stationsInitialState.stations);
  const [isFetchingStations, setIsFetchingStations] = useState<boolean>(false);
  const [recentStations, setRecentStations] = useState<string[]>([]); // referenced by id

  // fetch and set station data to state
  const fetchData = useCallback(async () => {
    setIsFetchingStations(true);
    const stationData = await API.TuneIn.getStations();
    setIsFetchingStations(false);

    setStations(stationData);
  }, [setIsFetchingStations, setStations]);

  // pull initial station data
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <StationsContext.Provider value={{ stations, setStations }}>
      <IsFetchingStationsContext.Provider value={{ isFetchingStations, setIsFetchingStations }}>
        <RecentStationsContext.Provider value={{ recentStations, setRecentStations }}>
          {children}
        </RecentStationsContext.Provider>
      </IsFetchingStationsContext.Provider>
    </StationsContext.Provider>
  );
};

export { StationsProvider, useIsFetchingStations, useRecentStations, useStations };
