import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ClassificationDepartmentWhereUniqueInput } from './classification-department-where-unique.input';
import { Type } from 'class-transformer';
import { ClassificationDepartmentUpdateWithoutClassificationInput } from './classification-department-update-without-classification.input';

@InputType()
export class ClassificationDepartmentUpdateWithWhereUniqueWithoutClassificationInput {
  @Field(() => ClassificationDepartmentWhereUniqueInput, { nullable: false })
  @Type(() => ClassificationDepartmentWhereUniqueInput)
  where!: Prisma.AtLeast<ClassificationDepartmentWhereUniqueInput, 'classification_id_department_id'>;

  @Field(() => ClassificationDepartmentUpdateWithoutClassificationInput, { nullable: false })
  @Type(() => ClassificationDepartmentUpdateWithoutClassificationInput)
  data!: ClassificationDepartmentUpdateWithoutClassificationInput;
}