import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { PositionRequestCountOrderByAggregateInput } from './position-request-count-order-by-aggregate.input';
import { PositionRequestAvgOrderByAggregateInput } from './position-request-avg-order-by-aggregate.input';
import { PositionRequestMaxOrderByAggregateInput } from './position-request-max-order-by-aggregate.input';
import { PositionRequestMinOrderByAggregateInput } from './position-request-min-order-by-aggregate.input';
import { PositionRequestSumOrderByAggregateInput } from './position-request-sum-order-by-aggregate.input';

@InputType()
export class PositionRequestOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  step?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  reports_to_position_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  parent_job_profile_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  profile_json?: keyof typeof SortOrder;

  @Field(() => SortOrderInput, { nullable: true })
  user_id?: SortOrderInput;

  @Field(() => SortOrder, { nullable: true })
  title?: keyof typeof SortOrder;

  @Field(() => SortOrderInput, { nullable: true })
  position_number?: SortOrderInput;

  @Field(() => SortOrder, { nullable: true })
  classification_id?: keyof typeof SortOrder;

  @Field(() => SortOrderInput, { nullable: true })
  classification_code?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  submission_id?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  status?: SortOrderInput;

  @Field(() => PositionRequestCountOrderByAggregateInput, { nullable: true })
  _count?: PositionRequestCountOrderByAggregateInput;

  @Field(() => PositionRequestAvgOrderByAggregateInput, { nullable: true })
  _avg?: PositionRequestAvgOrderByAggregateInput;

  @Field(() => PositionRequestMaxOrderByAggregateInput, { nullable: true })
  _max?: PositionRequestMaxOrderByAggregateInput;

  @Field(() => PositionRequestMinOrderByAggregateInput, { nullable: true })
  _min?: PositionRequestMinOrderByAggregateInput;

  @Field(() => PositionRequestSumOrderByAggregateInput, { nullable: true })
  _sum?: PositionRequestSumOrderByAggregateInput;
}