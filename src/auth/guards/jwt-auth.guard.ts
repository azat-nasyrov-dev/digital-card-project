import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  /**
   * Converts the GraphQL execution context into an HTTP request context.
   *
   * @param context Current execution context
   * @returns HTTP request object
   */
  public getRequest(context: ExecutionContext): Request {
    const gqlContext = GqlExecutionContext.create(context);

    return gqlContext.getContext<{ req: Request }>().req;
  }
}
