import { Strategy } from 'passport-local';
import { User } from 'src/modules/user/entities';
import { AuthService } from '../auth.service';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
  private authService;
  constructor(authService: AuthService);
  validate(username: User, password: string): Promise<any>;
}
export {};
