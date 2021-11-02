import { SetMetadata } from "@nestjs/common";
import { Role } from "../strategy/models/role.enum";

export const ROLES_KEY = "roles";
export const Roles = (...roles: Role[]) => SetMetadata("roles", roles);
