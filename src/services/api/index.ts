import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';

import TuneInAPI from 'services/api/tune-in';

/**
 * Top level function that wraps all axios calls. All API calls should run through
 * this method in case we need to make some app wide API changes for all requests
 */
const runAPIRequest = (config: AxiosRequestConfig): AxiosPromise => {
  return axios.request(config);
};

//
// --- API Namespace Object ---

/**
 * Wrap all API calls in a namespaced object so we only need to import one file to
 * access all API endpoints needed for the app.
 *
 * Individual API calls are organized into sub-folders
 */
const API = {
  /** TuneIn API Endpoints */
  TuneIn: TuneInAPI,
  /** Export app level api request function */
  runAPIRequest,
};

export default API;
