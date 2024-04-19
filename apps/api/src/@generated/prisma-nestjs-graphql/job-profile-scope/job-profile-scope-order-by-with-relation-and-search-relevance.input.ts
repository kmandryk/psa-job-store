import { Field, InputType } from '@nestjs/graphql';
import { JobProfileOrderByRelationAggregateInput } from '../job-profile/job-profile-order-by-relation-aggregate.input';
import { SortOrder } from '../prisma/sort-order.enum';
import { JobProfileScopeOrderByRelevanceInput } from './job-profile-scope-order-by-relevance.input';

@InputType()
export class JobProfileScopeOrderByWithRelationAndSearchRelevanceInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  description?: keyof typeof SortOrder;

  @Field(() => JobProfileOrderByRelationAggregateInput, { nullable: true })
  job_profiles?: JobProfileOrderByRelationAggregateInput;

  @Field(() => JobProfileScopeOrderByRelevanceInput, { nullable: true })
  _relevance?: JobProfileScopeOrderByRelevanceInput;
}
