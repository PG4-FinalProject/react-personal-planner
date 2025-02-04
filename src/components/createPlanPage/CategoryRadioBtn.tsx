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
    background-color: ${prop => prop.color};
    color: ${palette.white};
  }
`;

interface CategoryRadioBtnProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  category: CategoryI;
}

const CategoryRadioBtn = React.forwardRef(
  (
    { category, ...props }: CategoryRadioBtnProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <CategoryRadioBtnStyle color={category.color}>
        <input
          type="radio"
          id={category.name}
          name="category"
          value={category.id}
          {...props}
          ref={ref}
        />
        <label htmlFor={category.name}>{category.name}</label>
      </CategoryRadioBtnStyle>
    );
  },
);

export default CategoryRadioBtn;
