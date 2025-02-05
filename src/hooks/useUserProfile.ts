import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { userApi } from '../apis/user.api';
import type { UserProfile } from '../types/user.type';

export const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isLogin } = useAuthStore();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!isLogin) {
        setProfile(null);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const userData = await userApi.getUserProfile();
        setProfile(userData);
      } catch (err) {
        setError('사용자 정보를 불러오는 데 실패했습니다.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [isLogin]);

  const updateProfile = async (data: Partial<UserProfile>) => {
    try {
      const updatedProfile = await userApi.updateProfile(data);
      // 기존 프로필 정보와 업데이트된 정보를 병합
      setProfile(prev => (prev ? { ...prev, ...updatedProfile } : null));
      return updatedProfile;
    } catch (error) {
      console.error('프로필 업데이트 실패:', error);
      throw error;
    }
  };

  return {
    profile,
    isLoading,
    error,
    updateProfile, // 업데이트 함수 추가
  };
};
