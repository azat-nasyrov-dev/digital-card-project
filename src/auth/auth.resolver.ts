import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterInput } from './dto/register.input.js';
import { UserType } from './dto/user.type.js';
import { LoginResponse } from './dto/login.response.js';
import { LoginInput } from './dto/login.input.js';
import type { User } from '../generated/prisma/client.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';
import { AuthenticatedRequest } from './types/authenticated-request.js';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserType)
  public async register(@Args('input') input: RegisterInput): Promise<UserType> {
    return await this.authService.register(input);
  }

  @Mutation(() => LoginResponse)
  public async login(@Args('input') input: LoginInput): Promise<LoginResponse> {
    return await this.authService.login(input);
  }

  @Query(() => UserType)
  @UseGuards(JwtAuthGuard)
  public me(@Context() context: { req: AuthenticatedRequest }): User {
    return context.req.user;
  }
}
