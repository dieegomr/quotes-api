import { NextFunction, Request, Response } from 'express';
import { TokenGenerator, UserRepository } from '../gateways';

export function authMiddleware(
  userRepository: UserRepository,
  tokenGenerator: TokenGenerator
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res
        .status(400)
        .json(
          'You are not authorized to access this information, please log in to have access'
        );
    }

    const decodedJwt = await tokenGenerator.verify(token);

    const user = await userRepository.findById(decodedJwt.id);

    if (!user) {
      return res.status(400).json('User not found');
    }

    req.user = user;

    next();
  };
}
