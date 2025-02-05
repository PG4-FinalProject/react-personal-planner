import styled from 'styled-components';
import { CategoryI } from '../../types/category.type';
import { palette } from '../../styles/palette';
import React, { ForwardedRef } from 'react';

const CategoryRadioBtnStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  input[type='radio'] {
    appearance: none;
  }

  label {
    padding: 12px 16px;
    font-weight: bold;
    color: #4b5563;
    margin: 0px 7px 0px 0px;
    background-color: ${palette.white};
    border: 1px solid #e5e7eb;
    border-radius: 4px;
  }

  input:checked + label {
    background-color: ${prop => prop.bgColor};
    color: ${palette.white};
  }
`;

interface CategoryRadioBtnProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  category: CategoryI;
  defaultCategoryId?: number;
}

const CategoryRadioBtn = React.forwardRef(
  (
    { category, defaultCategoryId, ...props }: CategoryRadioBtnProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const defaultChecked = defaultCategoryId === category.id;
    return (
      <CategoryRadioBtnStyle bgColor={category.color}>
        <input
          type="radio"
          id={category.name}
          name="category"
          value={category.id}
          defaultChecked={defaultChecked}
          {...props}
          ref={ref}
        />
        <label htmlFor={category.name}>{category.name}</label>
      </CategoryRadioBtnStyle>
    );
  },
);

export default CategoryRadioBtn;
