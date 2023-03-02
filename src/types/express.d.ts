import { UserModel } from '../gateways';

declare global {
  namespace Express {
    export interface Request {
      user: UserModel;
    }
  }
}
