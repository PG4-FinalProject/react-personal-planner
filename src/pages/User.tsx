import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import ContentUIBox from '../components/layout/ContentUIBox';
import styled from 'styled-components';
import Title from '../components/common/Title';
import { useUserProfile } from '../hooks/useUserProfile'; // 사용자 프로필 훅 가져오기
import { useUserStore } from '../store/userStore';

// styled-components로 스타일 정의
const ProfileContainer = styled.div`
  display: flex;
  align-items: center; /* 수직 중앙 정렬 */
  gap: 16px; /* 요소 간격 */
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  width: 64px; /* 프로필 사진 크기 조정 */
  height: 64px;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const EditButton = styled.button`
  color: #3b82f6; /* Tailwind CSS의 blue-500 */
  margin-left: auto; /* 오른쪽 끝으로 밀기 */
  cursor: pointer;
  border: none; /* 테두리 제거 */
  background-color: transparent; /* 배경색 제거 */
  padding: 0; /* 패딩 제거 */
`;

const EmailText = styled.div`
  margin-top: 16px; /* 사용자 이름과 이메일 사이의 간격 */
  color: gray; /* 이메일 색상 */
`;

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { profile, isLoading, error } = useUserProfile(); // 사용자 프로필 훅 사용
  const profileImage = useUserStore(state => state.profileImage); // 전역 상태에서 이미지 가져오기

  const handleEditProfile = () => {
    navigate('/users/edit'); // 프로필 편집 페이지로 이동
  };

  if (isLoading) {
    return <ContentUIBox>로딩중...</ContentUIBox>; // 로딩 상태 처리
  }

  if (error) {
    return <ContentUIBox>{error}</ContentUIBox>; // 에러 상태 처리
  }

  return (
    <MainLayout>
      <ContentUIBox>
        <ProfileContainer>
          <ProfileImageWrapper>
            <ProfileImage
              src={profileImage || '/images/MainCharacter.png'}
              alt="프로필 사진"
            />
          </ProfileImageWrapper>
          <div>
            <Title fontSize="24px">{profile?.name || '사용자'}</Title>
            <EmailText>{profile?.email || '로그인하지 않음'}</EmailText>
          </div>
          <EditButton onClick={handleEditProfile}>
            {profile ? '프로필 편집' : '로그인하기'}
          </EditButton>
        </ProfileContainer>
      </ContentUIBox>
    </MainLayout>
  );
};

export default Profile;
