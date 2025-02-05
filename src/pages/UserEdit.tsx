import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import ContentUIBox from '../components/layout/ContentUIBox';
import { useUserProfile } from '../hooks/useUserProfile';
import { useAuthStore } from '../store/authStore'; // 로그인 상태 확인을 위한 훅 가져오기
import Title from '../components/common/Title';
import BackBtn from '../components/common/BackBtn'; // BackBtn 컴포넌트 가져오기
import Button from '../components/common/Button'; // Button 컴포넌트 가져오기
import { useNavigate, Navigate } from 'react-router-dom'; // useNavigate 및 Navigate 가져오기

const UserEditContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* 중앙 정렬 */
  gap: 16px; /* 요소 간격 */
  padding: 20px;
  flex: 1; /* 남은 공간을 차지하도록 설정 */
`;

const ProfileImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #efefef; /* 배경색 */
  margin-bottom: 20px; /* 아래 여백 */
`;

const InputField = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  margin-bottom: 16px; /* 아래 여백 */
  margin-left: 16px; /* 오른쪽 여백 추가 */
`;

const HeaderContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

const FooterContainer = styled.div`
  margin: 8px;
  padding: 20px;
  width: 100%;
`;

const TitleContainer = styled.div`
  flex: 1; /* 나머지 공간을 차지하도록 설정 */
  text-align: center; /* 중앙 정렬 */
`;

const UserEdit: React.FC = () => {
  const navigate = useNavigate();
  const { isLogin } = useAuthStore();
  const { profile, updateProfile } = useUserProfile();
  const [name, setName] = useState(profile?.name || '');
  const [profileImage, setProfileImage] = useState<string | null>(
    profile?.profileImage || null,
  );

  useEffect(() => {
    if (profile?.name) {
      setName(profile.name);
    }
  }, [profile]);

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = event => {
        setProfileImage(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    const success = await updateProfile({
      name,
      profileImage: profileImage || undefined,
    });

    if (success) {
      navigate('/users');
    }
  };

  return (
    <Layout
      headerContent={
        <HeaderContainer>
          <BackBtn onClick={() => navigate(-1)} />
          <TitleContainer>
            <Title fontSize="24px">프로필 수정</Title>
          </TitleContainer>
        </HeaderContainer>
      }
      footerContent={
        <FooterContainer>
          <Button height="48px" onClick={handleSave}>
            저장하기
          </Button>
        </FooterContainer>
      }
      onPageChange={() => {}}
    >
      <ContentUIBox>
        <UserEditContainer>
          <ProfileImageWrapper>
            {profileImage ? (
              <img
                src={profileImage}
                alt="프로필 사진"
                style={{ borderRadius: '50%', width: '100%', height: '100%' }}
              />
            ) : (
              <span>+</span>
            )}
          </ProfileImageWrapper>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginBottom: '16px', marginLeft: '64px' }}
          />
          <InputField
            type="text"
            placeholder="이름을 입력하세요"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </UserEditContainer>
      </ContentUIBox>
    </Layout>
  );
};

export default UserEdit;
