import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength } from 'class-validator';

@InputType({ description: 'User login input.' })
export class LoginInput {
  @Field(() => String, { description: 'User email address.' })
  @IsEmail()
  readonly email!: string;

  @Field(() => String, { description: 'User password.' })
  @IsString()
  @MinLength(8)
  readonly password!: string;
}
