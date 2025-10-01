import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';

const uiSlice = createSlice({
  name: 'qtyUi',
  initialState: 1 as number,
  reducers: {
    setQty: (_s, action: PayloadAction<number>) => action.payload,
  },
});
export const { setQty } = uiSlice.actions;
export default uiSlice.reducer;
export const selectQtyUi = (s: RootState) => s.qtyUi;
