import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from './productsThunks';
import type { Product } from '../../types';

type ProductState = {
  items: Product[];
  error: string | null;
  loading: boolean;
};

const initialState: ProductState = {
  items: [],
  error: null,
  loading: false,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        if (action.meta.aborted || action.error?.name === 'AbortError') {
          return;
        }
        state.error =
          (action.payload as string | undefined) ??
          action.error?.message ??
          'Unknown error';
      });
  },
});

export default productsSlice.reducer;
