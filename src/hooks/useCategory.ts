import { useEffect, useState } from 'react';
import { CategoryI } from '../types/category.type';
import { getCategories } from '../apis/category.api';

export const useCategory = () => {
  const [categories, setCategories] = useState<CategoryI[]>([]);

  useEffect(() => {
    getCategories().then(res => {
      setCategories(res);
    });
  }, []);

  return {
    categories,
  };
};
