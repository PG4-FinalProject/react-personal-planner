// src/hooks/useUserProfile.ts
import { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '../store/authStore';
import { useAlert } from './useAlert';
import { requestHandler } from '../apis/http';
import { useUserStore } from '../store/userStore';

interface UserProfile {
  id?: number;
  name: string;
  email: string;
  profileImage?: string;
}

export const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isLogin } = useAuthStore();
  const { showAlert } = useAlert();
  const setProfileImage = useUserStore(state => state.setProfileImage);

  const fetchProfile = useCallback(async () => {
    if (!isLogin) return;

    try {
      setError(null);
      const response = await requestHandler('get', '/users');
      setProfile(response);
    } catch (error) {
      console.error('프로필 조회 실패:', error);
      setError('프로필을 불러오는데 실패했습니다.');
      showAlert('프로필을 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [isLogin, showAlert]);

  const updateProfile = async (updatedProfile: Partial<UserProfile>) => {
    try {
      await requestHandler('put', '/users/edit', {
        name: updatedProfile.name,
      });

      if (updatedProfile.profileImage) {
        setProfileImage(updatedProfile.profileImage); // 전역 상태 업데이트
      }

      setProfile(prev => (prev ? { ...prev, ...updatedProfile } : null));
      showAlert('프로필 수정이 완료되었습니다.');
      return true;
    } catch (error) {
      console.error('프로필 업데이트 실패:', error);
      showAlert('프로필 수정에 실패했습니다.');
      return false;
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    profile,
    isLoading,
    error,
    updateProfile,
    refetch: fetchProfile,
  };
};
