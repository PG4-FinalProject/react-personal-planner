import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { JoinData, LoginData } from '../models/user.model';
import { join, login } from '../apis/auth.api';
import { useAlert } from './useAlert';

export const useAuth = () => {
  const { storeLogin } = useAuthStore();

  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const userLogin = (loginData: LoginData) => {
    login(loginData).then(
      res => {
        storeLogin(res.token);
        showAlert('로그인이 완료되었습니다.');
        navigate('/calendar');
      },
      err => {
        showAlert('로그인에 실패하셨습니다.');
      },
    );
  };

  const userJoin = (joinData: JoinData) => {
    join(joinData).then(res => {
      showAlert('회원가입이 완료되었습니다');
      navigate('/users/login');
    });
  };

  return {
    userLogin,
    userJoin,
  };
};
