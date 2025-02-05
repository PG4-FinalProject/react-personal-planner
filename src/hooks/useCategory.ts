import { useEffect, useState } from 'react';
import { CategoryI } from '../types/category.type';
import { getCategories } from '../apis/category.api';
import { useNavigate } from 'react-router-dom';

export const useCategory = () => {
  const [categories, setCategories] = useState<CategoryI[]>([]);

  useEffect(() => {
    getCategories().then(
      res => {
        setCategories(res);
      },
      err => {
        console.log('카테고리 조회 실패!');
      },
    );
  }, []);

  return {
    categories,
  };
};
