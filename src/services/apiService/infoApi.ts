import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  CharacterInfo,
  InfoResponse,
  PlanetInfo,
} from 'services/ResponseTypes';
import { CategoryRequestEnum, MAIN_INFO_URL } from 'utils/constants';

interface InfoParamsInterface {
  category: CategoryRequestEnum;
  page?: number;
}
interface PersonalInfoParamsInterface {
  category: CategoryRequestEnum;
  id: string;
}

export const infoApi = createApi({
  reducerPath: 'infoApi',
  baseQuery: fetchBaseQuery({ baseUrl: MAIN_INFO_URL }),
  endpoints: (builder) => ({
    getInfo: builder.query<InfoResponse, InfoParamsInterface>({
      query: ({ category, page }) => `${category}/?page=${page}`,
    }),
    getPersonalInfo: builder.query<
      CharacterInfo | PlanetInfo,
      PersonalInfoParamsInterface
    >({
      query: ({ category, id }) => `${category}/${id}`,
    }),
  }),
});

export const { useGetInfoQuery, useGetPersonalInfoQuery } = infoApi;
