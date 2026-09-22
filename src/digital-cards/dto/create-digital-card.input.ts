import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength } from 'class-validator';

@InputType({ description: 'Digital card creation input.' })
export class CreateDigitalCardInput {
  @Field(() => String, { description: 'Unique public card slug.' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'Slug must contain only lowercase letters, numbers, and hyphens',
  })
  readonly slug!: string;

  @Field(() => String, { description: 'Card title.' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  readonly title!: string;

  @Field(() => String, { nullable: true, description: 'Short card biography.' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly bio?: string;

  @Field(() => String, { nullable: true, description: 'Contact phone number.' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  readonly phone?: string;

  @Field(() => String, { description: 'Public contact email.' })
  @IsOptional()
  @IsEmail()
  readonly email?: string;
}
