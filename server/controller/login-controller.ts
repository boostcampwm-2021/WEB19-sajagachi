import { Request, Response } from 'express';
import loginService from '../service/login-service';

export const login = async (req: Request, res: Response, next: Function) => {
	try {
		let user = await loginService.findById(req.body.userId);
		if (user === undefined)
			user = await loginService.signUp(req.body.userId);
		res.cookie('user', loginService.createToken(user));
		res.status(201).json();
	} catch (err: any) {
		next({ statusCode: 500, message: err.message });
	}
};

export const checkLogin = async (req: Request, res: Response, next: Function) => {
