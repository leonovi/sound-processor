import { config } from '../config';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const auth = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const token =
    request.headers.authorization?.split(' ')[1];

  if (!token) {
    next();
  } else {
    const userPayload = jwt.verify(
      token,
      config.jwt.token as string
    );

    // @ts-ignore
    request.user = userPayload;
    next();
  }
};
