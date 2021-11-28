const getOptions = () => {
  const options: RequestInit = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Cache: 'no-cache',
      credentials: 'include'
    }
  };
  return options;
};

const postOptions = () => {
  const options: RequestInit = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Cache: 'no-cache',
      credentials: 'include'
    }
  };
  return options;
};

const errorHandler = (status: number) => {
  if (status === 500) return '서버에서 데이터를 불러오는데 실패하였습니다.';
  // 이런식으로 처리하는게 어떨까?
};

const getLogin = async () => {
  const loginUrl = `${process.env.REACT_APP_SERVER_URL}/api/login`;
  const result = await fetch(loginUrl, getOptions());
  if (result.status !== 200) return errorHandler(result.status);
  return await result.json();
};

const getParticipants = async (postId: number) => {
  const participantUrl = `${process.env.REACT_APP_SERVER_URL}/api/chat/${postId}/participant`;
  const result = await fetch(participantUrl, getOptions());
  if (result.status !== 200) return errorHandler(result.status);
  return await result.json();
};

const getTitle = async (postId: number) => {
  const titleUrl = `${process.env.REACT_APP_SERVER_URL}/api/post/${postId}/title`;
  const result = await fetch(titleUrl, getOptions());
  if (result.status !== 200) return errorHandler(result.status);
  return await result.json();
};

const service = { getLogin, getParticipants, getTitle };

export default service;
