import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../../typeorm/User';

export const ReqUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User | null => {
    const request = ctx.switchToHttp().getRequest();
    return request.user ?? null;
  },
);
