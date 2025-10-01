import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { selectError, selectLoading, selectProducts } from './selectors';
import { fetchProducts } from './productsThunks';

export function useProducts() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const error = useAppSelector(selectError);
  const loading = useAppSelector(selectLoading);

  useEffect(() => {
    const p = dispatch(fetchProducts());
    return () => p.abort();
  }, [dispatch]);

  return { products, loading, error };
}
