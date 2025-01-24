import { palette } from './palette';
import styled from 'styled-components';
import Content from '../components/layout/Content';
import Button from '../components/common/LongBtn';

export const StyledContent = styled(Content)`
  display: block;
  padding-top: 120px;
  min-height: calc(100vh - 112px);
  background-color: ${palette.white};
  margin-top: 20px;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 100%;
  max-width: 502px;
  padding: 0 20px;
  margin: 0 auto;
  margin-top: 250px;
`;

export const Subtitle = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
  margin-bottom: 40px;
  text-align: left;
`;

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`;

export const TermsContainer = styled.div`
  width: 100%;
  margin-bottom: 24px;
  display: flex;
  align-items: left;
  gap: 8px;

  label {
    font-size: 14px;
    color: #666;
  }

  a {
    color: #4285f4;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const JoinButton = styled(Button)`
  width: 100%;
  height: 48px;
  margin-bottom: 16px;
  background-color: palette.blue;
`;
