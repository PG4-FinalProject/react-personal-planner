import styled from 'styled-components';
import { palette } from './palette';
import Content from '../components/layout/Content';

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 24px;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
`;

export const Subtitle = styled.p`
  font-size: 14px;
  padding: 8px 0px;
  margin: 0 0 40px;
  text-align: left;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`;

export const TermsContainer = styled.div`
  margin-bottom: 24px;
  display: flex;
  align-items: left;
  gap: 8px;

  label {
    font-size: 14px;
    color: #666;
  }

  a {
    color: ${palette.blue};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;
