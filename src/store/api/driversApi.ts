import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {BaseQueryFn} from '@reduxjs/toolkit/query';
import axios from 'axios';
import type {AxiosRequestConfig, AxiosError} from 'axios';
import {IDriver, IDriverResponse} from 'types/driver';
import {IDriverRacesResponse} from 'types/races';

const axiosBaseQuery =
  (
    {baseUrl}: {baseUrl: string} = {baseUrl: ''},
  ): BaseQueryFn<
    {
      url: string | null;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
    },
    unknown,
    unknown
  > =>
  async ({url, method, data, params}) => {
    try {
      const result = await axios({
        url: baseUrl + url + '.json',
        method,
        data,
        params,
      });

      return {data: result.data};
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const driversApi = createApi({
  reducerPath: 'driversApi',
  baseQuery: axiosBaseQuery({
    baseUrl: 'http://ergast.com/api/f1/drivers',
  }),
  endpoints: builder => ({
    getAllDrivers: builder.query<IDriverResponse, number>({
      query: page => ({
        url: '',
        method: 'get',
        params: {offset: (page - 1) * 30, limit: 30},
      }),
    }),
    getOneDriver: builder.query<IDriver, string>({
      query: id => ({url: `/${id}`, method: 'get'}),
      transformResponse: (response: IDriverResponse, meta, arg) =>
        response?.MRData?.DriverTable.Drivers[0],
    }),
    getDriverRaces: builder.query<
      IDriverRacesResponse,
      {id: string; page: number}
    >({
      query: ({id, page}) => ({
        url: `/${id}/results`,
        method: 'get',
        params: {offset: (page - 1) * 30, limit: 30},
      }),
    }),
  }),
});

export const {
  useGetAllDriversQuery,
  useGetOneDriverQuery,
  useGetDriverRacesQuery,
} = driversApi;
