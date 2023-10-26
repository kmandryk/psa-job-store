import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class JobProfileHistoryAvgOrderByAggregateInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  job_profile_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  created_by?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  updated_by?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  deleted_by?: keyof typeof SortOrder;
}
