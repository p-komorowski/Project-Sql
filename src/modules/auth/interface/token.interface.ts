import { Customer } from "src/modules/user/entities";

export interface TokenInterface {
  token: string;
  expTime: Date;
  lastLogin: Date;
  user: Customer;
}
