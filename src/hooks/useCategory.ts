import { useEffect, useState } from 'react';
import { CategoryI } from '../types/category.type';
import { getCategories } from '../apis/category.api';
import { useNavigate } from 'react-router-dom';

export const useCategory = () => {
  const [categories, setCategories] = useState<CategoryI[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories().then(
      res => {
        setCategories(res);
      },
      err => {
        navigate(-1);
      },
    );
  }, []);

  return {
    categories,
  };
};
