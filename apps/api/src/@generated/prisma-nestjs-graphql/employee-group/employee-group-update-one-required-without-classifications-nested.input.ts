import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { EmployeeGroupCreateOrConnectWithoutClassificationsInput } from './employee-group-create-or-connect-without-classifications.input';
import { EmployeeGroupCreateWithoutClassificationsInput } from './employee-group-create-without-classifications.input';
import { EmployeeGroupUpdateToOneWithWhereWithoutClassificationsInput } from './employee-group-update-to-one-with-where-without-classifications.input';
import { EmployeeGroupUpsertWithoutClassificationsInput } from './employee-group-upsert-without-classifications.input';
import { EmployeeGroupWhereUniqueInput } from './employee-group-where-unique.input';

@InputType()
export class EmployeeGroupUpdateOneRequiredWithoutClassificationsNestedInput {
  @Field(() => EmployeeGroupCreateWithoutClassificationsInput, { nullable: true })
  @Type(() => EmployeeGroupCreateWithoutClassificationsInput)
  create?: EmployeeGroupCreateWithoutClassificationsInput;

  @Field(() => EmployeeGroupCreateOrConnectWithoutClassificationsInput, { nullable: true })
  @Type(() => EmployeeGroupCreateOrConnectWithoutClassificationsInput)
  connectOrCreate?: EmployeeGroupCreateOrConnectWithoutClassificationsInput;

  @Field(() => EmployeeGroupUpsertWithoutClassificationsInput, { nullable: true })
  @Type(() => EmployeeGroupUpsertWithoutClassificationsInput)
  upsert?: EmployeeGroupUpsertWithoutClassificationsInput;

  @Field(() => EmployeeGroupWhereUniqueInput, { nullable: true })
  @Type(() => EmployeeGroupWhereUniqueInput)
  connect?: Prisma.AtLeast<EmployeeGroupWhereUniqueInput, 'id'>;

  @Field(() => EmployeeGroupUpdateToOneWithWhereWithoutClassificationsInput, { nullable: true })
  @Type(() => EmployeeGroupUpdateToOneWithWhereWithoutClassificationsInput)
  update?: EmployeeGroupUpdateToOneWithWhereWithoutClassificationsInput;
}
