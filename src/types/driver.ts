export type IDriver = {
  dateOfBirth: Date;
  driverId: string;
  familyName: string;
  givenName: string;
  nationality: string;
  url: string;
  code?: string;
};

export type IDriverTable = {
  Drivers: IDriver[];
};

export type IDriverResponse = {
  MRData: {
    DriverTable: IDriverTable;
  } & ResponseData;
};

export type ResponseData = {
  limit: number;
  offset: number;
  sefies: string;
  total: number;
  url: string;
  xmlns: string;
};
