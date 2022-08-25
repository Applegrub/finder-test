import { CategoryRequestEnum, MAIN_INFO_URL } from 'utils/constants';
import { CharacterInfo, PlanetInfo } from './ResponseTypes';

interface Props {
  category: CategoryRequestEnum;
  id: string;
  onComplete: (arg: CharacterInfo | PlanetInfo) => void;
}

export const getPersonalInfoRequest = async ({
  category,
  id,
  onComplete,
}: Props) => {
  await fetch(`${MAIN_INFO_URL}${category}/${id}`, {})
    .then((res) => res.json())
    .then((res) => onComplete(res));
};
