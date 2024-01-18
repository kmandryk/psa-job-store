import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { JobProfileJobFamilyOrderByWithRelationAndSearchRelevanceInput } from '../job-profile-job-family/job-profile-job-family-order-by-with-relation-and-search-relevance.input';
import { JobProfileOrderByRelationAggregateInput } from '../job-profile/job-profile-order-by-relation-aggregate.input';
import { JobProfileStreamOrderByRelevanceInput } from './job-profile-stream-order-by-relevance.input';

@InputType()
export class JobProfileStreamOrderByWithRelationAndSearchRelevanceInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  job_family_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder;

  @Field(() => JobProfileJobFamilyOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  job_family?: JobProfileJobFamilyOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => JobProfileOrderByRelationAggregateInput, { nullable: true })
  job_profiles?: JobProfileOrderByRelationAggregateInput;

  @Field(() => JobProfileStreamOrderByRelevanceInput, { nullable: true })
  _relevance?: JobProfileStreamOrderByRelevanceInput;
}
