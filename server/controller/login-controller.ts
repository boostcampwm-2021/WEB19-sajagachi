import { Request, Response } from 'express';
import userService from '../service/user-service';
import axios from 'axios';
import ERROR from '../util/error';

declare module 'express-session' {
  interface SessionData {
    userId: number;
    userName: string;
  }
}

export const githubLogin = async (req: Request, res: Response, next: Function) => {
  try {
    const { code } = req.query;
    const githubAccessToken = await getGithubAccessToken(code);
    const githubUserData = await getGithubUserData(githubAccessToken);
    if (!githubUserData) next(ERROR.NO_GITHUB_USER);

    let user = await userService.findById(githubUserData.id);
    if (user === undefined) user = await userService.signUp(githubUserData.id, githubUserData.login);
    req.session.userId = user.id;
    req.session.userName = user.name;
    res.redirect(`${process.env.CLIENT_URL}`);
  } catch (err: any) {
    next(ERROR.DB_READ_FAIL);
  }
};

export const checkLogin = async (req: Request, res: Response, next: Function) => {
  try {
    const id = req.session.userId;
    if (id) {
      const user = await userService.findById(id);
      if (user) res.status(200).json({ id: user.id, name: user.name });
      else next(ERROR.NOT_LOGGED_IN);
    } else next(ERROR.NOT_LOGGED_IN);
  } catch (err: any) {
    next(ERROR.DB_READ_FAIL);
  }
};

export const logout = async (req: Request, res: Response, next: Function) => {
  try {
    req.session.destroy(() => {
      res.json('success');
    });
  } catch (err: any) {
    next(ERROR.SESSION_DESTROY_FAIL);
  }
};

const getGithubAccessToken = async (code: any) => {
  const url = `https://github.com/login/oauth/access_token`;
  const githubResponse = await axios.post(
    url,
    {
      client_id: process.env.OAUTH_CLIENT_ID,
      client_secret: process.env.OAUTH_CLIENT_SECRET,
      code
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
  );
  return githubResponse.data.access_token;
};

const getGithubUserData = async (githubAccessToken: any) => {
  const userInfoResponse = await axios.get(`https://api.github.com/user`, {
    headers: {
      Authorization: `token ${githubAccessToken}`
    }
  });
  const userInfo = userInfoResponse.data;
  return userInfo;
};
