import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import InputText from '../components/common/InputText';
import { palette } from '../styles/palette';
import { join } from '../apis/auth';
import Title from '../components/common/Title';
import {
  StyledContent,
  FormContainer,
  Subtitle,
  InputContainer,
  TermsContainer,
  JoinButton,
} from '../styles/Join.styles';

const Join: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handlePageChange = (path: string) => {
    navigate(path);
  };

  const handleJoin = async (): Promise<void> => {
    if (!agreed) {
      alert('이용약관에 동의해주세요.');
      return;
    }

    try {
      // 회원가입 처리 로직
      const result = await join(email, password, name);
      console.log('회원가입 성공:', result);
      // 성공 시 다른 페이지로 이동하거나 알림 등을 추가
      navigate('/users/login'); // 예시: 가입 성공 후 이동할 페이지
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message); // 오류 메시지 표시
      } else {
        alert('회원가입 중 알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  return (
    <>
      <Header borderWidth="0px">
        <div></div>
      </Header>
      <StyledContent background-color={palette.black}>
        <FormContainer>
          <Title fontSize="34px" color="#000" textAlign="left">
            회원가입
          </Title>
          <Subtitle>회원가입을 위한 정보를 입력해주세요.</Subtitle>

          <InputContainer>
            <InputText
              height="54px"
              width="100%"
              bgColor="#f8f8f8"
              fontSize="16px"
              placeholder="이름"
              value={name}
              borderWidth="0px"
              onChange={e => setName(e.target.value)}
            />
            <InputText
              height="54px"
              width="100%"
              bgColor="#f8f8f8"
              fontSize="16px"
              placeholder="이메일"
              value={email}
              borderWidth="0px"
              onChange={e => setEmail(e.target.value)}
            />
            <InputText
              height="54px"
              width="100%"
              bgColor="#f8f8f8"
              fontSize="16px"
              type="password"
              placeholder="비밀번호"
              value={password}
              borderWidth="0px"
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

          <JoinButton onClick={handleJoin} width={'100%'} height={'54px'}>
            가입하기
          </JoinButton>
        </FormContainer>
      </StyledContent>
      <Footer onPageChange={handlePageChange} />
    </>
  );
};

export default Join;
