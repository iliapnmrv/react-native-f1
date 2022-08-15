import {IDriver, ResponseData} from './driver';

export interface RaceTable {
  season: string;
  round: string;
  Races?: RacesEntity[] | null;
}

export interface RacesEntity {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: Circuit;
  date: string;
  time: string;
  Results?: ResultsEntity[] | null;
}

export interface ResultsEntity {
  number: string;
  position: string;
  positionText: string;
  points: string;
  Driver: IDriver;
  Constructor: Constructor;
  grid: string;
  laps: string;
  status: string;
  Time: Time;
  FastestLap: FastestLap;
}

export interface Location {
  lat: string;
  long: string;
  locality: string;
  country: string;
}

export type ILocation = {
  lat: string;
  long: string;
  locality: string;
  country: string;
};

export type IRace = {
  circuitId: string;
  url: string;
  circuitName: string;
  location: ILocation;
};

export type IDriverRacesResponse = {
  MRData: {
    RaceTable: RaceTable;
  } & ResponseData;
};

export interface Circuit {
  circuitId: string;
  url: string;
  circuitName: string;
  Location: Location;
}

export interface Constructor {
  constructorId: string;
  url: string;
  name: string;
  nationality: string;
}

export interface Time {
  millis: string;
  time: string;
}

export interface FastestLap {
  rank: string;
  lap: string;
  Time: Time;
  AverageSpeed: AverageSpeed;
}

export interface AverageSpeed {
  units: string;
  speed: string;
}
