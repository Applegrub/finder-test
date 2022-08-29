import { createSlice } from '@reduxjs/toolkit';
import { CategoryRequestEnum } from 'utils/constants';
import { RootState } from './store';

const categoriesSlice = createSlice({
  name: 'category',
  initialState: CategoryRequestEnum.people,
  reducers: {
    changeCategory: (state, { payload }) => payload,
  },
});

export const { changeCategory } = categoriesSlice.actions;
export const selectorCategory = (state: RootState) => state.category;
export default categoriesSlice.reducer;
