import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { validate as isUuid } from 'uuid';
import { BadRequestException } from '@nestjs/common';

export const UuidValidation = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const id = request.params.id;

    if (!isUuid(id)) {
      throw new BadRequestException('Formato de UUID inválido.');
    }

    return id;
  },
);
