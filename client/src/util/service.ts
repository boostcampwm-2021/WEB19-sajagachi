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

const postOptions = (body: any = null) => {
  const options: RequestInit = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Cache: 'no-cache'
    },
    credentials: 'include'
  };

  if (body) options.body = JSON.stringify(body);
  return options;
};

const handleResult = async (response: Response) => {
  const result = await response.json();
  if (response.status !== 200) throw new Error(result);
  return result;
};

const getLogin = async () => {
  const loginUrl = `${process.env.REACT_APP_SERVER_URL}/api/login`;
  const response = await fetch(loginUrl, getOptions());
  return await handleResult(response);
};

const getParticipants = async (postId: number) => {
  const participantUrl = `${process.env.REACT_APP_SERVER_URL}/api/chat/${postId}/participant`;
  const response = await fetch(participantUrl, getOptions());
  return await handleResult(response);
};

const getTitle = async (postId: number) => {
  const titleUrl = `${process.env.REACT_APP_SERVER_URL}/api/post/${postId}/title`;
  const response = await fetch(titleUrl, getOptions());
  return await handleResult(response);
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
const getPost = async (postId: number) => {
  const postUrl = `${process.env.REACT_APP_SERVER_URL}/api/post/${postId}`;
  const response = await fetch(postUrl, getOptions());
  return await handleResult(response);
};

const getChats = async (postId: number, cursor: number | undefined, limit: number) => {
  const queryString = createQueryString({ cursor, limit });
  const chatUrl = `${process.env.REACT_APP_SERVER_URL}/api/chat/${postId}?${queryString}`;
  const response = await fetch(chatUrl, getOptions());
  return await handleResult(response);
};
const getHost = async (postId: number) => {
  const hostUrl = `${process.env.REACT_APP_SERVER_URL}/api/post/${postId}/host`;
  const response = await fetch(hostUrl, getOptions());
  return await handleResult(response);
};

const enterChat = async (postId: number) => {
  const enterChatUrl = `${process.env.REACT_APP_SERVER_URL}/api/chat/${postId}/participant`;
  const response = await fetch(enterChatUrl, postOptions());
  return await handleResult(response);
};
const getParticipationPosts = async (
  loginUserId: number,
  option: { limit: number; nextCursor: number | undefined }
) => {
  let url = `${process.env.REACT_APP_SERVER_URL}/api/user/${loginUserId}/participationPosts?limit=${option.limit}`;
  if (option.nextCursor !== undefined)
    url = `${process.env.REACT_APP_SERVER_URL}/api/user/${loginUserId}/participationPosts?cursor=${option.nextCursor}&limit=${option.limit}`;

  const response = await fetch(url, getOptions());
  return await handleResult(response);
};
const createPost = async (body: any) => {
  const postUrl = `${process.env.REACT_APP_SERVER_URL}/api/post/`;
  const response = await fetch(postUrl, postOptions(body));
  return await handleResult(response);
};

const getFinished = async (postId: number) => {
  const finishedUrl = `${process.env.REACT_APP_SERVER_URL}/api/post/${postId}/finished`;
  const response = await fetch(finishedUrl, getOptions());
  return await handleResult(response);
};

const getUser = async (userId: number) => {
  const userUrl = `${process.env.REACT_APP_SERVER_URL}/api/user/${userId}`;
  const response = await fetch(userUrl, getOptions());
  return await handleResult(response);
};

const getCategories = async () => {
  const categoryUrl = `${process.env.REACT_APP_SERVER_URL}/api/category`;
  const response = await fetch(categoryUrl, getOptions());
  return await handleResult(response);
};

const updatePoint = async (userId: number, point: number) => {
  const pointUrl = `${process.env.REACT_APP_SERVER_URL}/api/user/${userId}/point`;
  const response = await fetch(pointUrl, postOptions({ point }));
  return await handleResult(response);
};

const service = {
  getLogin,
  getParticipants,
  getTitle,
  getHost,
  getFinished,
  getUser,
  updatePoint,
  createPost,
  getCategories,
  getPost,
  getParticipationPosts,
  postFile,
  getChats,
  enterChat
};

export default service;
