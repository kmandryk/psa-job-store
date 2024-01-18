import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class JobProfileCountAggregate {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: false })
  career_group_id!: number;

  @Field(() => Int, { nullable: false })
  job_family_id!: number;

  @Field(() => Int, { nullable: false })
  role_id!: number;

  @Field(() => Int, { nullable: false })
  scope_id!: number;

  @Field(() => Int, { nullable: false })
  state!: number;

  @Field(() => Int, { nullable: false })
  stream_id!: number;

  @Field(() => Int, { nullable: false })
  type!: number;

  @Field(() => Int, { nullable: false })
  updated_at!: number;

  @Field(() => Int, { nullable: false })
  owner_id!: number;

  @Field(() => Int, { nullable: false })
  title!: number;

  @Field(() => Int, { nullable: false })
  number!: number;

  @Field(() => Int, { nullable: false })
  overview!: number;

  @Field(() => Int, { nullable: false })
  accountabilities!: number;

  @Field(() => Int, { nullable: false })
  requirements!: number;

  @Field(() => Int, { nullable: false })
  _all!: number;
}
