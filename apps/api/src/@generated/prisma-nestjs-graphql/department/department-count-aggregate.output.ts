import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DepartmentCountAggregate {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: false })
  location_id!: number;

  @Field(() => Int, { nullable: false })
  organization_id!: number;

  @Field(() => Int, { nullable: false })
  peoplesoft_id!: number;

  @Field(() => Int, { nullable: false })
  code!: number;

  @Field(() => Int, { nullable: false })
  name!: number;

  @Field(() => Int, { nullable: false })
  effective_status!: number;

  @Field(() => Int, { nullable: false })
  effective_date!: number;

  @Field(() => Int, { nullable: false })
  _all!: number;
}
