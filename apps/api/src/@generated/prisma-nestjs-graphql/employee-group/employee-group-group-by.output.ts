import { Field, ObjectType } from '@nestjs/graphql';
import { EmployeeGroupCountAggregate } from './employee-group-count-aggregate.output';
import { EmployeeGroupMaxAggregate } from './employee-group-max-aggregate.output';
import { EmployeeGroupMinAggregate } from './employee-group-min-aggregate.output';

@ObjectType()
export class EmployeeGroupGroupBy {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => EmployeeGroupCountAggregate, { nullable: true })
  _count?: EmployeeGroupCountAggregate;

  @Field(() => EmployeeGroupMinAggregate, { nullable: true })
  _min?: EmployeeGroupMinAggregate;

  @Field(() => EmployeeGroupMaxAggregate, { nullable: true })
  _max?: EmployeeGroupMaxAggregate;
}
