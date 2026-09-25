import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUrl, MaxLength } from 'class-validator';

@InputType({ description: 'Social link creation input.' })
export class AddSocialLinkInput {
  @Field(() => String, { description: 'Social platform name.' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly platform!: string;

  @Field(() => String, { description: 'Social platform URL.' })
  @IsUrl()
  @MaxLength(50)
  readonly url!: string;
}
