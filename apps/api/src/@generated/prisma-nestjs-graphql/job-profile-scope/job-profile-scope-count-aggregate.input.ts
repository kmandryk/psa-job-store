import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileScopeCountAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  name?: true;

  @Field(() => Boolean, { nullable: true })
  description?: true;

  @Field(() => Boolean, { nullable: true })
  _all?: true;
}
