import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { palette } from '../styles/palette';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import InputText from '../components/common/InputText';
import Button from '../components/common/LongBtn';
import BackBtn from '../components/common/BackBtn';
import Title from '../components/common/Title';
import {
  FormContainer,
  Subtitle,
  InputContainer,
  TermsContainer,
} from '../styles/Join.styles';
import { useAuth } from '../hooks/useAuth';
import { useAlert } from '../hooks/useAlert';
import Content from '../components/layout/Content';

const Join: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);

  const { userJoin } = useAuth();
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const handleJoin = () => {
    if (!agreed) {
      showAlert('이용약관에 동의해주세요.');
      return;
    }
    userJoin({
      name,
      email,
      password,
    });
  };

  const inputProps = {
    height: '54px',
    width: '100%',
    bgColor: '#f8f8f8',
    fontSize: '16px',
    borderWidth: '0px',
  };

  return (
    <>
      <Header borderWidth="0px">
        <BackBtn onClick={() => navigate(-1)} />
      </Header>
      <Content color={palette.white}>
        <FormContainer>
          <Title fontSize="34px" color="#000" textAlign="left">
            회원가입
          </Title>
          <Subtitle>회원가입을 위한 정보를 입력해주세요.</Subtitle>

          <InputContainer>
            <InputText
              {...inputProps}
              placeholder="이름"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <InputText
              {...inputProps}
              placeholder="이메일"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <InputText
              {...inputProps}
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </InputContainer>

          <TermsContainer>
            <input
              type="checkbox"
              id="terms"
              checked={agreed}
              onChange={e => setAgreed(e.target.checked)}
            />
            <label htmlFor="terms">
              I have read and agree to the{' '}
              <a href="/privacy-policy">privacy policy</a> and{' '}
              <a href="/terms">terms</a>
            </label>
          </TermsContainer>

          <Button
            onClick={handleJoin}
            width="100%"
            height="54px"
            background-color={palette.blue}
          >
            가입하기
          </Button>
        </FormContainer>
      </Content>
      <Footer onPageChange={path => navigate(path)} borderWidth="0px" />
    </>
  );
};

export default Join;
