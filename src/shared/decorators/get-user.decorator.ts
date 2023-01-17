import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserPayload } from 'src/auth/interfaces/user.payload';
import { User, UserDocument } from 'src/user/schemas/user.schema';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserDocument => {
    const request = ctx.switchToHttp().getRequest();

    return request.user;
  },
);
