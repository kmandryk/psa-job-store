import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ClassificationDepartmentCountAggregate } from './classification-department-count-aggregate.output';
import { ClassificationDepartmentMinAggregate } from './classification-department-min-aggregate.output';
import { ClassificationDepartmentMaxAggregate } from './classification-department-max-aggregate.output';

@ObjectType()
export class AggregateClassificationDepartment {
  @Field(() => ClassificationDepartmentCountAggregate, { nullable: true })
  _count?: ClassificationDepartmentCountAggregate;

  @Field(() => ClassificationDepartmentMinAggregate, { nullable: true })
  _min?: ClassificationDepartmentMinAggregate;

  @Field(() => ClassificationDepartmentMaxAggregate, { nullable: true })
  _max?: ClassificationDepartmentMaxAggregate;
}