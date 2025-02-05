import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackBtn from '../common/BackBtn';
import IconButton from '../common/CheckBtn';
import styled from 'styled-components';
import { palette } from '../../styles/palette';
import { useAuthStore } from '../../store/authStore';
import { useUserProfile } from '../../hooks/useUserProfile';
import { Bell, Moon, LogOut } from 'lucide-react';
import { useUserStore } from '../../store/userStore';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 150;
`;

const ButtonWrapper = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
`;

const SidebarHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 16px;
  border-bottom: 1px solid #ebebeb;
`;

const ProfileSection = styled.div`
  padding: 24px 16px;
  border-bottom: 1px solid #ebebeb;
`;

const ProfileImage = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background-color: #f5f5f5;
  margin-bottom: 12px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const ProfileName = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 4px;
`;

const ProfileEmail = styled.p`
  font-size: 14px;
  color: ${palette.gray};
`;

const MenuSection = styled.div`
  padding: 16px 0;
`;

const MenuTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  padding: 0 16px;
  margin-bottom: 8px;
`;

const MenuItem = styled.button`
  width: 100%;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  border: none;
  background: none;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }

  span {
    font-size: 16px;
    color: ${palette.gray};
  }
`;

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  width: 300px;
  transform: translateX(-265px);
  height: 100%;
  background-color: white;
  z-index: 200;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;

  @media (max-width: 534px) {
    left: 0;
    transform: none;
  }
`;

const MenuItemButton = styled(IconButton)`
  margin: 4px 0;
  width: 100%;
  height: 48px;
  border-radius: 0;
  background-color: transparent;
  color: ${palette.gray};
  font-weight: normal;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const LogoutMenuButton = styled(IconButton)`
  margin: 4px 0;
  width: 100%;
  height: 48px;
  border-radius: 0;
  background-color: transparent;
  color: ${palette.red};
  font-weight: normal;
  border-top: 1px solid #ebebeb;
  margin-top: auto;

  &:hover {
    background-color: #f5f5f5;
  }
`;

interface SidebarMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { isLogin, storeLogout } = useAuthStore();
  const { profile, isLoading } = useUserProfile();
  const profileImage = useUserStore(state => state.profileImage);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleLogin = () => {
    onClose();
    navigate('/users/login');
  };

  const handleLogout = () => {
    storeLogout();
    onClose();
    navigate('/');
  };

  // const toggleNotification = () => {
  //   updateSettings({
  //     notificationEnabled: !settings.notificationEnabled,
  //   });
  // };

  // const toggleTheme = () => {
  //   updateSettings({
  //     theme: settings.theme === 'light' ? 'dark' : 'light',
  //   });
  // };
  // 로딩 상태나 오류 처리
  if (isLoading) return <div>Loading...</div>;
  if (!isOpen) return null;

  return (
    <>
      <Overlay onClick={onClose} />
      <SidebarContainer>
        <SidebarHeader>
          <BackBtn size={24} onClick={onClose} />
        </SidebarHeader>

        {isLogin ? (
          <>
            <ProfileSection>
              <ProfileImage
                style={{
                  backgroundImage: profileImage
                    ? `url(${profileImage})`
                    : profile?.profileImage
                      ? `url(${profile.profileImage})`
                      : `url(/assets/MainCharacter.png)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <ProfileName>{profile?.name}</ProfileName>
              <ProfileEmail>{profile?.email}</ProfileEmail>
            </ProfileSection>

            <MenuTitle>My account</MenuTitle>
            <MenuSection>
              {/* <MenuItemButton
                width="100%"
                bgColor="transparent"
                color={palette.gray}
                onClick={toggleNotification}
              >
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                >
                  <Bell size={20} />
                  알림 설정 {settings.notificationEnabled ? '끄기' : '켜기'}
                </div>
              </MenuItemButton> */}

              {/* <MenuItemButton
                width="100%"
                bgColor="transparent"
                color={palette.gray}
                onClick={toggleTheme}
              >
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                >
                  <Moon size={20} />
                  테마 설정 ({settings.theme === 'light'
                    ? '다크'
                    : '라이트'}{' '}
                  모드)
                </div>
              </MenuItemButton> */}

              <LogoutMenuButton
                width="100%"
                bgColor="transparent"
                color="#ef4444"
                onClick={handleLogout}
              >
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                >
                  <LogOut size={20} />
                  로그아웃
                </div>
              </LogoutMenuButton>
            </MenuSection>
          </>
        ) : (
          <ButtonWrapper>
            <IconButton
              width="90%"
              bgColor={palette.white}
              color={palette.gray}
              onClick={handleLogin}
              fontSize="20px"
            >
              로그인하기
            </IconButton>
          </ButtonWrapper>
        )}
      </SidebarContainer>
    </>
  );
};

export default SidebarMenu;
