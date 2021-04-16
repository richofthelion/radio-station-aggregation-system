import { stationsEndpoints } from './stations';
//
// --- Export Endpoints ---

/**
 * return all TuneIn API calls namespaced to a TuneInAPI namespace object
 */
const TuneInAPI = {
  ...stationsEndpoints,
};

export default TuneInAPI;
