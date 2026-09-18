import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType({ description: 'User registration input.' })
export class RegisterInput {
  @Field(() => String, { description: 'User email address.' })
  @IsEmail()
  readonly email!: string;

  @Field(() => String, { description: 'User display name.' })
  @IsString()
  @IsNotEmpty()
  readonly name!: string;

  @Field(() => String, { description: 'User password.' })
  @IsString()
  @MinLength(8)
  readonly password!: string;
}
