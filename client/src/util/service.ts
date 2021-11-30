import { PostInputType } from '../type';

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

const postOptions = (body: any) => {
  const options: RequestInit = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Cache: 'no-cache'
    },
    credentials: 'include',
    body: JSON.stringify(body)
  };

  if (body) options.body = JSON.stringify(body);
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

const getPost = async (postId: number) => {
  const postUrl = `${process.env.REACT_APP_SERVER_URL}/api/post/${postId}`;
  const response = await fetch(postUrl, getOptions());
  const result = await response.json();
  if (response.status !== 200) throw new Error(result);
  return result;
};

const getHost = async (postId: number) => {
  const hostUrl = `${process.env.REACT_APP_SERVER_URL}/api/post/${postId}/host`;
  const response = await fetch(hostUrl, getOptions());
  const result = await response.json();
  if (response.status !== 200) throw new Error(result);
  return result;
};

const getParticipationPosts = async (
  loginUserId: number,
  option: { limit: number; nextCursor: number | undefined }
) => {
  let url = `${process.env.REACT_APP_SERVER_URL}/api/user/${loginUserId}/participationPosts?limit=${option.limit}`;
  if (option.nextCursor !== undefined)
    url = `${process.env.REACT_APP_SERVER_URL}/api/user/${loginUserId}/participationPosts?cursor=${option.nextCursor}&limit=${option.limit}`;

  const response = await fetch(url, getOptions());
  const result = await response.json();
  if (response.status !== 200) throw new Error(result);
  return result;
};
const createPost = async (body: PostInputType) => {
  const postUrl = `${process.env.REACT_APP_SERVER_URL}/api/post/`;
  const response = await fetch(postUrl, postOptions(body));
  const result = await response.json();
  if (response.status !== 200) throw new Error(result);
  return result;
};

const getFinished = async (postId: number) => {
  const finishedUrl = `${process.env.REACT_APP_SERVER_URL}/api/post/${postId}/finished`;
  const response = await fetch(finishedUrl, getOptions());
  const result = await response.json();
  if (response.status !== 200) throw new Error(result);
  return result;
};

const getUser = async (userId: number) => {
  const userUrl = `${process.env.REACT_APP_SERVER_URL}/api/user/${userId}`;
  const response = await fetch(userUrl, getOptions());
  const result = await response.json();
  if (response.status !== 200) throw new Error(result);
  return result;
};

const getCategories = async () => {
  const categoryUrl = `${process.env.REACT_APP_SERVER_URL}/api/category`;
  const response = await fetch(categoryUrl, getOptions());
  const result = await response.json();
  if (response.status !== 200) throw new Error(result);
  return result;
};

const updatePoint = async (userId: number, point: number) => {
  const pointUrl = `${process.env.REACT_APP_SERVER_URL}/api/user/${userId}/point`;
  const response = await fetch(pointUrl, postOptions({ point }));
  const result = await response.json();
  if (response.status !== 200) throw new Error(result);
  return result;
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
  getParticipationPosts
};

export default service;
