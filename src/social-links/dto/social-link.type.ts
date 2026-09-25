import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Social media link.' })
export class SocialLinkType {
  @Field(() => String, { description: 'Social link unique identifier.' })
  readonly id!: string;

  @Field(() => String, { description: 'Digital card identifier.' })
  readonly cardId!: string;

  @Field(() => String, { description: 'Social platform name.' })
  readonly platform!: string;

  @Field(() => String, { description: 'Social profile URL.' })
  readonly url!: string;

  @Field(() => Date, { description: 'Link creation date.' })
  readonly createdAt!: Date;
}
