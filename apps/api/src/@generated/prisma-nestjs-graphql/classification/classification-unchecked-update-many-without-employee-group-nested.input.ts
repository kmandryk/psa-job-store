import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { ClassificationCreateManyEmployee_groupInputEnvelope } from './classification-create-many-employee-group-input-envelope.input';
import { ClassificationCreateOrConnectWithoutEmployee_groupInput } from './classification-create-or-connect-without-employee-group.input';
import { ClassificationCreateWithoutEmployee_groupInput } from './classification-create-without-employee-group.input';
import { ClassificationScalarWhereInput } from './classification-scalar-where.input';
import { ClassificationUpdateManyWithWhereWithoutEmployee_groupInput } from './classification-update-many-with-where-without-employee-group.input';
import { ClassificationUpdateWithWhereUniqueWithoutEmployee_groupInput } from './classification-update-with-where-unique-without-employee-group.input';
import { ClassificationUpsertWithWhereUniqueWithoutEmployee_groupInput } from './classification-upsert-with-where-unique-without-employee-group.input';
import { ClassificationWhereUniqueInput } from './classification-where-unique.input';

@InputType()
export class ClassificationUncheckedUpdateManyWithoutEmployee_groupNestedInput {
  @Field(() => [ClassificationCreateWithoutEmployee_groupInput], { nullable: true })
  @Type(() => ClassificationCreateWithoutEmployee_groupInput)
  create?: Array<ClassificationCreateWithoutEmployee_groupInput>;

  @Field(() => [ClassificationCreateOrConnectWithoutEmployee_groupInput], { nullable: true })
  @Type(() => ClassificationCreateOrConnectWithoutEmployee_groupInput)
  connectOrCreate?: Array<ClassificationCreateOrConnectWithoutEmployee_groupInput>;

  @Field(() => [ClassificationUpsertWithWhereUniqueWithoutEmployee_groupInput], { nullable: true })
  @Type(() => ClassificationUpsertWithWhereUniqueWithoutEmployee_groupInput)
  upsert?: Array<ClassificationUpsertWithWhereUniqueWithoutEmployee_groupInput>;

  @Field(() => ClassificationCreateManyEmployee_groupInputEnvelope, { nullable: true })
  @Type(() => ClassificationCreateManyEmployee_groupInputEnvelope)
  createMany?: ClassificationCreateManyEmployee_groupInputEnvelope;

  @Field(() => [ClassificationWhereUniqueInput], { nullable: true })
  @Type(() => ClassificationWhereUniqueInput)
  set?: Array<Prisma.AtLeast<ClassificationWhereUniqueInput, 'id'>>;

  @Field(() => [ClassificationWhereUniqueInput], { nullable: true })
  @Type(() => ClassificationWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<ClassificationWhereUniqueInput, 'id'>>;

  @Field(() => [ClassificationWhereUniqueInput], { nullable: true })
  @Type(() => ClassificationWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<ClassificationWhereUniqueInput, 'id'>>;

  @Field(() => [ClassificationWhereUniqueInput], { nullable: true })
  @Type(() => ClassificationWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<ClassificationWhereUniqueInput, 'id'>>;

  @Field(() => [ClassificationUpdateWithWhereUniqueWithoutEmployee_groupInput], { nullable: true })
  @Type(() => ClassificationUpdateWithWhereUniqueWithoutEmployee_groupInput)
  update?: Array<ClassificationUpdateWithWhereUniqueWithoutEmployee_groupInput>;

  @Field(() => [ClassificationUpdateManyWithWhereWithoutEmployee_groupInput], { nullable: true })
  @Type(() => ClassificationUpdateManyWithWhereWithoutEmployee_groupInput)
  updateMany?: Array<ClassificationUpdateManyWithWhereWithoutEmployee_groupInput>;

  @Field(() => [ClassificationScalarWhereInput], { nullable: true })
  @Type(() => ClassificationScalarWhereInput)
  deleteMany?: Array<ClassificationScalarWhereInput>;
}
