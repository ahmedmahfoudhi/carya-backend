import { RolesEnum } from "src/user/enums/user-roles.enum";


export interface JwtPayloadDto {
  role: RolesEnum;
  email: string;
  password: string;
}