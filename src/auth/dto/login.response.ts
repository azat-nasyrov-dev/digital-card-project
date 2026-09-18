import { Field, ObjectType } from '@nestjs/graphql';
import { UserType } from './user.type.js';

@ObjectType({ description: 'User authentication response.' })
export class LoginResponse {
  @Field(() => String, { description: 'JWT access token.' })
  readonly accessToken!: string;

  @Field(() => UserType, { description: 'Authenticated user.' })
  readonly user!: UserType;
}
