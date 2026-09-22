import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Digital business card.' })
export class DigitalCardType {
  @Field(() => String, { description: 'Digital card unique identifier.' })
  readonly id!: string;

  @Field(() => String, { description: 'Owner user identifier.' })
  readonly userId!: string;

  @Field(() => String, { description: 'Unique public card slug.' })
  readonly slug!: string;

  @Field(() => String, { description: 'Card title.' })
  readonly title!: string;

  @Field(() => String, { nullable: true, description: 'Short card biography.' })
  readonly bio!: string | null;

  @Field(() => String, { nullable: true, description: 'Contact phone number.' })
  readonly phone!: string | null;

  @Field(() => String, { nullable: true, description: 'Public contact email.' })
  readonly email!: string | null;

  @Field(() => Date, { description: 'Card creation date.' })
  readonly createdAt!: Date;

  @Field(() => Date, { description: 'Card last update date.' })
  readonly updatedAt!: Date;
}
