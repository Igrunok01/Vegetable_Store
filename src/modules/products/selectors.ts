import type { RootState } from '../../store/store';

export const selectProducts = (s: RootState) => s.products.items;
export const selectError = (s: RootState) => s.products.error;
export const selectLoading = (s: RootState) => s.products.loading;
