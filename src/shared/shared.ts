import { UserRolesEnum } from 'src/user/enums/user-role.enum';

export const getUserId = (
  userRole: UserRolesEnum,
  currentUserId: string,
  queryParamId: string,
) => {
  if (userRole === UserRolesEnum.ADMIN) return queryParamId;
  return currentUserId;
};
