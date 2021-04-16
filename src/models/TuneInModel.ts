//
// --- Stations Data (same data structure as API Response) ---

export interface TuneInStationData {
  readonly id: string;
  readonly description: string;
  readonly name: string;
  readonly imgUrl: string;
  readonly streamUrl: string;
  readonly reliability: number;
  readonly popularity: number;
  readonly tags: string[];
}

//
// -- Content Genre --

export enum ContentGenreEnum {
  MUSIC = 'music',
  NEWS = 'news',
  SPORTS = 'sports'
}

export type ContentGenreType =
  | 'music'
  | 'news'
  | 'sports';

//
// -- FontAwesome Genre Icon Enum --

export const FontAwesomeGenreIconMapping: {
  readonly [genre in ContentGenreType]: string
} = {
  music: 'music',
  news: 'newspaper',
  sports: 'futbol'
};
