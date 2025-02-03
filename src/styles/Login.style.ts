import styled from 'styled-components';
import { palette } from './palette';
import Content from '../components/layout/Content';
import Button from '../components/common/LongBtn';

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
`;

export const LogoContainer = styled.div`
  margin-bottom: 24px;
`;

export const Subtitle = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
  margin-bottom: 40px;
`;

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`;

export const LoginButton = styled(Button)`
  width: 100%;
  height: 54px;
  margin-bottom: 36px;
  background-color: #4285f4;
`;

export const SignupText = styled.p`
  color: #666;
  font-size: 14px;
  padding: 8px 0px;
  margin: 0;
  margin-bottom: 8px;

  & > a {
    color: #4285f4;
    text-decoration: none;
    margin-left: 8px;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Divider = styled.div`
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #eee;
  line-height: 0;
  margin: 32px 0;

  span {
    background: ${palette.white};
    padding: 0 10px;
    color: #666;
    font-size: 14px;
  }
`;

export const SocialLoginContainer = styled.div`
  width: 100%;

  h3 {
    text-align: center;
    font-size: 14px;
    color: #666;
    font-weight: normal;
    margin-bottom: 16px;
  }
`;

export const SocialButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;

  button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;

    img {
      width: 40px;
      height: 40px;
    }
  }
`;
