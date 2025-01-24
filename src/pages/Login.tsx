import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import InputText from '../components/common/InputText';
import Logo from '../components/common/Logo';
import { login } from '../apis/auth';
import {
  StyledContent,
  FormContainer,
  LogoContainer,
  Subtitle,
  InputContainer,
  LoginButton,
  SignupText,
  Divider,
  SocialLoginContainer,
  SocialButtons,
} from '../styles/Login.styles';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handlePageChange = (path: string) => {
    navigate(path);
  };

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigate('/'); // 메인 페이지로 이동
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <>
      <Header borderWidth="0px">
        <div></div>
      </Header>
      <StyledContent>
        <FormContainer>
          <LogoContainer>
            <Logo height="40px" />
          </LogoContainer>
          <Subtitle>당신의 일정을 스마트하게 관리하세요</Subtitle>

          <InputContainer>
            <InputText
              height="48px"
              width="100%"
              bgColor="#f8f8f8"
              fontSize="16px"
              placeholder="이메일"
              borderWidth="0px"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <InputText
              height="48px"
              width="100%"
              bgColor="#f8f8f8"
              fontSize="16px"
              type="password"
              placeholder="비밀번호"
              borderWidth="0px"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </InputContainer>

          <LoginButton onClick={handleLogin} width={'100%'} height={'54px'}>
            로그인
          </LoginButton>

          <SignupText>
            아직 회원이 아니세요?
            <a onClick={() => navigate('/users/join')}>회원 가입하기</a>
          </SignupText>

          <Divider>
            <span>Or</span>
          </Divider>

          <SocialLoginContainer>
            <h3>SNS 간편 로그인</h3>
            <SocialButtons>
              <button>
                <img src="/google" alt="Google 로그인" />
              </button>
              <button>
                <img src="/kakao" alt="Kakao 로그인" />
              </button>
              <button>
                <img src="/naver" alt="Naver 로그인" />
              </button>
              <button>
                <img src="/phone" alt="휴대폰 로그인" />
              </button>
            </SocialButtons>
          </SocialLoginContainer>
        </FormContainer>
      </StyledContent>
      <Footer onPageChange={handlePageChange} />
    </>
  );
};

export default Login;
