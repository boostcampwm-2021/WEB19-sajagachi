import { createQueryString } from '../util';
const getOptions = () => {
  const options: RequestInit = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Cache: 'no-cache'
    },
    credentials: 'include'
  };
  return options;
};

const postOptions = () => {
  const options: RequestInit = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Cache: 'no-cache'
    },
    credentials: 'include'
  };
  return options;
};

const getLogin = async () => {
  const loginUrl = `${process.env.REACT_APP_SERVER_URL}/api/login`;
  const response = await fetch(loginUrl, getOptions());
  const result = await response.json();
  if (response.status !== 200) throw new Error(result);
  return result;
};

const getParticipants = async (postId: number) => {
  const participantUrl = `${process.env.REACT_APP_SERVER_URL}/api/chat/${postId}/participant`;
  const response = await fetch(participantUrl, getOptions());
  const result = await response.json();
  if (response.status !== 200) throw new Error(result);
  return result;
};

const getTitle = async (postId: number) => {
  const titleUrl = `${process.env.REACT_APP_SERVER_URL}/api/post/${postId}/title`;
  const response = await fetch(titleUrl, getOptions());
  const result = await response.json();
  if (response.status !== 200) throw new Error(result);
  return result;
};

const postFile = async (postId: number, formData: FormData) => {
  const uploadUrl = `${process.env.REACT_APP_SERVER_URL}/api/chat/upload/${postId}`;
  const options = {
    method: 'POST',
    credentials: 'include' as RequestCredentials,
    body: formData
  };
  const response = await fetch(uploadUrl, options);
  const result = await response.json();
  if (response.status !== 200) throw new Error(result);
  return result;
};

const getChats = async (postId: number, cursor: number | undefined, limit: number) => {
  const queryString = createQueryString({ cursor, limit });
  const chatUrl = `${process.env.REACT_APP_SERVER_URL}/api/chat/${postId}?${queryString}`;
  const response = await fetch(chatUrl, getOptions());
  const result = await response.json();
  if (response.status !== 200) throw new Error(result);
  return result;
};

const enterChat = async (postId: number) => {
  const enterChatUrl = `${process.env.REACT_APP_SERVER_URL}/api/chat/${postId}/participant`;
  const response = await fetch(enterChatUrl, postOptions());
  const result = await response.json();
  if (response.status !== 200) throw new Error(result);
  return result;
};

const service = { getLogin, getParticipants, getTitle, postFile, getChats, enterChat };

export default service;
