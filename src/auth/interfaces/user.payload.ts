import { UserRolesEnum } from 'src/user/enums/user-role.enum';

export interface UserPayload {
  id: string;
  email: string;
  role: UserRolesEnum;
}
