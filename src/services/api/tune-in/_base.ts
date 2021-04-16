import { AxiosRequestConfig, AxiosPromise } from 'axios';

import API from 'services/api';

//
// --- Constants ---

/**
 * base url (prefix) for all TuneIn api calls
 */
export const TUNE_IN_API_BASE_URL = 'https://s3-us-west-1.amazonaws.com/cdn-web.tunein.com/';

//
// --- Run TuneIn API Wrapper ---

/**
 * Function that wraps all TuneIn api calls. All TuneIn API calls should run through
 * this method in case we need to make some API changes for TuneIn API requests
 *
 * BaseURL is set to TUNE_IN_API_BASE_URL so individual calls include values relative
 * to this path as its `url` value
 */
export const runTuneInAPIRequest = (config: AxiosRequestConfig): AxiosPromise => {
  config.baseURL = TUNE_IN_API_BASE_URL;

  return API.runAPIRequest(config);
};
