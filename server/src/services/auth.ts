import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';
import type { Request, Response } from 'express';
import { storage } from './storage';
import { config } from '../config';

const generateToken = (id: string, username: string) => {
  return jwt.sign(
    { id, username },
    config.jwt.token as string,
    { expiresIn: '24h' }
  );
};

class AuthService {
  async reg(request: Request, response: Response) {
    const { username, password } = request.body;

    if (await storage.findUser(username)) {
      return response
        .status(400)
        .json({ message: `${username} is already exist` });
    }

    await storage.writeUser({
      id: nanoid(),
      username,
      password: bcrypt.hashSync(password, 3),
    });

    return response
      .status(200)
      .json({ message: 'User created' });
  }

  async login(request: Request, response: Response) {
    const { username, password } = request.body;

    const user = await storage.findUser(username)
    if (!user) {
      return response
        .status(400)
        .json({ message: `${username} not found` });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return response
        .status(400)
        .json({ message: `Wrong password` });
    }

    return response
      .status(200)
      .json({
        token: generateToken(user.id, user.username),
      });
  }
}

const auth = new AuthService();

export { auth };
