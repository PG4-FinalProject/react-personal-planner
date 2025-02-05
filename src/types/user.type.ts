export interface LoginReqBody {
  email: string;
  password: string;
}

export interface JoinReqBody {
  name: string;
  email: string;
  password: string;
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  profileImage?: string;
}

export interface UserSettings {
  theme?: 'light' | 'dark';
  notificationEnabled?: boolean;
}
