import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionEmployeeOrderByRelevanceFieldEnum } from './position-employee-order-by-relevance-field.enum';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class PositionEmployeeOrderByRelevanceInput {
  @Field(() => [PositionEmployeeOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<keyof typeof PositionEmployeeOrderByRelevanceFieldEnum>;

  @Field(() => SortOrder, { nullable: false })
  sort!: keyof typeof SortOrder;

  @Field(() => String, { nullable: false })
  search!: string;
}
