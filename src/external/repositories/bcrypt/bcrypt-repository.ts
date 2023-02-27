import bcrypt from 'bcrypt';
import { PasswordHashing } from '../../../gateways';

export class BcryptRepository implements PasswordHashing {
  async hash(password: string): Promise<string> {
    const BCRYPT_SALT = 10;
    const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT);
    return hashedPassword;
  }
}
