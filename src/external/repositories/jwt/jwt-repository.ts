import jwt from 'jsonwebtoken';
import { TokenGenerator } from '../../../gateways';

export class JwtRepository implements TokenGenerator {
  async sign(userId: string): Promise<string> {
    return jwt.sign({ id: userId }, process.env.JWT_PASS ?? '', {
      expiresIn: '24h',
    });
  }
}
