import { useEffect, useState } from 'react';
import ky from 'ky';
import type { Product } from '../../types';

const URL =
  'https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const fetchProducts = await ky
          .get(URL, { timeout: 5000, retry: { limit: 2 } })
          .json<Product[]>();
        if (isMounted) setProducts(fetchProducts);
      } catch (e) {
        if (isMounted) setError('Не удалось загрузить продукты');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return { products, loading, error };
}
