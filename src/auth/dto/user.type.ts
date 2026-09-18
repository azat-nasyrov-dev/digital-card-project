import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'User information.' })
export class UserType {
  @Field(() => String, { description: 'User unique identifier.' })
  readonly id!: string;

  @Field(() => String, { description: 'User email address.' })
  readonly email!: string;

  @Field(() => String, { description: 'User display name.' })
  readonly name!: string;

  @Field(() => Date, { description: 'User creation date.' })
  readonly createdAt!: Date;

  @Field(() => Date, { description: 'User last update date.' })
  readonly updatedAt!: Date;
}
