import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileContextSumAggregate {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: true })
  job_profile_id?: number;
}
