export interface User {
  id: number;
  name: string;
  email: string;
  profileImage?: string;
}

export const mockUser: User = {
  id: 1,
  name: '김철수',
  email: 'kimcs@email.com',
  profileImage: undefined, // 프로필 이미지는 나중에 추가할 수 있도록
};
