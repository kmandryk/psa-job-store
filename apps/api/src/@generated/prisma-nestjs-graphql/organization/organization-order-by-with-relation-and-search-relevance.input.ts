import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { DepartmentOrderByRelationAggregateInput } from '../department/department-order-by-relation-aggregate.input';
import { JobProfileOrderByRelationAggregateInput } from '../job-profile/job-profile-order-by-relation-aggregate.input';
import { OrganizationOrderByRelevanceInput } from './organization-order-by-relevance.input';

@InputType()
export class OrganizationOrderByWithRelationAndSearchRelevanceInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder;

  @Field(() => DepartmentOrderByRelationAggregateInput, { nullable: true })
  departments?: DepartmentOrderByRelationAggregateInput;

  @Field(() => JobProfileOrderByRelationAggregateInput, { nullable: true })
  job_profiles?: JobProfileOrderByRelationAggregateInput;

  @Field(() => OrganizationOrderByRelevanceInput, { nullable: true })
  _relevance?: OrganizationOrderByRelevanceInput;
}
