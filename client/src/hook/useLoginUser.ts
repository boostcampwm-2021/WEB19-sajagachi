import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { loginUserState } from '../store/login';
import { fetchGet } from '../util';

const useLoginUser = () => {
  const [loginUser, setLoginUser] = useRecoilState(loginUserState);

  useEffect(() => {
    if (!loginUser.isSigned) {
      const url = `${process.env.REACT_APP_SERVER_URL}/api/login`;
      fetchGet(url).then(userLogin => {
        if (!isNaN(userLogin.id)) {
          setLoginUser({
            id: userLogin.id,
            name: userLogin.name,
            isSigned: true
          });
        }
      });
    }
  }, []);

  return loginUser;
};

export default useLoginUser;
