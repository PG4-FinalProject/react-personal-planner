import styled from 'styled-components';
import { palette } from './palette';
import Content from '../components/layout/Content';

export const StyledContent = styled(Content)`
  display: block;
  padding-top: 100px;
  min-height: calc(100vh - 112px);
  margin-top: 15px;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  max-width: 502px;
  padding: 0 20px;
  margin: 225px auto 0;
`;

export const Subtitle = styled.p`
  font-size: 14px;
  color: #666;
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
