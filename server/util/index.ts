import jwt from 'jsonwebtoken';
import { TokenType } from '../type';

export const decodeToken = (token: string) => {
  try {
    const secretKey: jwt.Secret = String(process.env.JWT_SECRET);
    const { id: myId } = jwt.verify(token, secretKey) as TokenType;
    return myId;
  } catch {
    return 'error';
  }
};
