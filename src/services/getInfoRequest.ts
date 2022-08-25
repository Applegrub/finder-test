import { CategoryRequestEnum, MAIN_INFO_URL } from 'utils/constants';
import { InfoResponse } from './ResponseTypes';

interface Props {
  category: CategoryRequestEnum;
  initPage?: number;
  onComplete: (arg: InfoResponse) => void;
  searchParam?: string;
}

export const getInfoRequest = async ({
  category,
  initPage,
  onComplete,
  searchParam,
}: Props) => {
  const baseUrl = `${MAIN_INFO_URL}${category}`;
  const url = searchParam
    ? `${baseUrl}/?search=${searchParam}`
    : `${baseUrl}/?page=${initPage}`;

  await fetch(url, {})
    .then((res) => res.json())
    .then((res) => onComplete(res));
};
