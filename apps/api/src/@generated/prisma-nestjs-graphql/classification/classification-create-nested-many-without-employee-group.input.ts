import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationCreateWithoutEmployee_groupInput } from './classification-create-without-employee-group.input';
import { Type } from 'class-transformer';
import { ClassificationCreateOrConnectWithoutEmployee_groupInput } from './classification-create-or-connect-without-employee-group.input';
import { ClassificationCreateManyEmployee_groupInputEnvelope } from './classification-create-many-employee-group-input-envelope.input';
import { Prisma } from '@prisma/client';
import { ClassificationWhereUniqueInput } from './classification-where-unique.input';

@InputType()
export class ClassificationCreateNestedManyWithoutEmployee_groupInput {
  @Field(() => [ClassificationCreateWithoutEmployee_groupInput], { nullable: true })
  @Type(() => ClassificationCreateWithoutEmployee_groupInput)
  create?: Array<ClassificationCreateWithoutEmployee_groupInput>;

  @Field(() => [ClassificationCreateOrConnectWithoutEmployee_groupInput], { nullable: true })
  @Type(() => ClassificationCreateOrConnectWithoutEmployee_groupInput)
  connectOrCreate?: Array<ClassificationCreateOrConnectWithoutEmployee_groupInput>;

  @Field(() => ClassificationCreateManyEmployee_groupInputEnvelope, { nullable: true })
  @Type(() => ClassificationCreateManyEmployee_groupInputEnvelope)
  createMany?: ClassificationCreateManyEmployee_groupInputEnvelope;

  @Field(() => [ClassificationWhereUniqueInput], { nullable: true })
  @Type(() => ClassificationWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<ClassificationWhereUniqueInput, 'id'>>;
}
