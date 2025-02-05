import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import ContentUIBox from '../components/layout/ContentUIBox';
import { useUserProfile } from '../hooks/useUserProfile';
import { useAlert } from '../hooks/useAlert';

const Profile: React.FC = () => {
  const { profile, updateProfile } = useUserProfile();
  const [userName, setUserName] = useState('');
  const { showAlert } = useAlert();

  // profile이 변경될 때마다 입력 필드 초기화
  useEffect(() => {
    if (profile) {
      setUserName(profile.name);
    }
  }, [profile]);

  const handleNameChange = async () => {
    if (!profile) return;

    try {
      await updateProfile({ name: userName });
      showAlert('프로필이 성공적으로 수정되었습니다.');
    } catch (error) {
      showAlert('프로필 수정에 실패했습니다.');
      console.error(error);
    }
  };

  return (
    <MainLayout>
      <ContentUIBox>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">프로필 수정</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              이메일
            </label>
            <input
              type="email"
              value={profile?.email || ''}
              disabled
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              이름
            </label>
            <input
              type="text"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <button
            onClick={handleNameChange}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            프로필 수정
          </button>
        </div>
      </ContentUIBox>
    </MainLayout>
  );
};

export default Profile;
