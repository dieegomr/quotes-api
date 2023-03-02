import jwt, { JwtPayload } from 'jsonwebtoken';
import { TokenGenerator } from '../../../gateways';

export class JwtRepository implements TokenGenerator {
  async verify(token: string): Promise<jwt.JwtPayload> {
    return jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload;
  }
  async sign(userId: string): Promise<string> {
    return jwt.sign({ id: userId }, process.env.JWT_PASS ?? '', {
      expiresIn: '24h',
    });
  }
}
