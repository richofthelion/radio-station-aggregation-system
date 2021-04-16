import { runTuneInAPIRequest } from './_base';
import { TuneInStationData } from 'models/TuneInModel';

/**
 * TuneIn Stations API
 *
 * @see https://s3-us-west-1.amazonaws.com/cdn-web.tunein.com/stations.json
 */

/**
 * Get complete list of available stations
 */
const getStations = async (): Promise<TuneInStationData[]> => {
  const url = '/stations.json';

  return runTuneInAPIRequest({
    url,
  })
    .then((result) => result.data?.data)
    .catch((error) => console.log(`Error fetching stations: ${error}`));
};

//
// --- Stations Endpoints Export ---

export const stationsEndpoints = {
  getStations,
};
