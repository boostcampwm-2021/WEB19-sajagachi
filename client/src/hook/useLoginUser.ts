import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { loginUserState } from '../store/login';
import service from '../util/service';

const useLoginUser = () => {
  const [loginUser, setLoginUser] = useRecoilState(loginUserState);
  const updateLoginUser = async () => {
    try {
      const login = await service.getLogin();
      setLoginUser({
        id: login.id,
        name: login.name,
        isSigned: true
      });
    } catch (err) {}
  };

  useEffect(() => {
    loginUser.isSigned || updateLoginUser();
  }, []);

  return loginUser;
};

export default useLoginUser;
