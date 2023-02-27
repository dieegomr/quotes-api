import bcrypt from 'bcrypt';
import { PasswordHashing } from '../../../gateways';

export class BcryptRepository implements PasswordHashing {
  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
}
