import jwt, { JwtPayload } from 'jsonwebtoken';
import { TokenGenerator } from '../../../gateways';
import { JwtError } from './errors/jwt-error';

const JWT_EXPIRES_IN_SECONDS = 60;

export class JwtRepository implements TokenGenerator {
  async verify(token: string): Promise<jwt.JwtPayload> {
    try {
      return jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload;
    } catch (error) {
      return new JwtError();
    }
  }
  async sign(userId: string): Promise<string> {
    return jwt.sign({ id: userId }, process.env.JWT_PASS ?? '', {
      expiresIn: JWT_EXPIRES_IN_SECONDS,
    });
  }
}
