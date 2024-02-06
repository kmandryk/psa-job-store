import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionRequestUncheckedUpdateManyWithoutDepartmentNestedInput } from '../position-request/position-request-unchecked-update-many-without-department-nested.input';
import { PositionRequestUncheckedUpdateManyWithoutPaylist_departmentNestedInput } from '../position-request/position-request-unchecked-update-many-without-paylist-department-nested.input';
import { ClassificationDepartmentUncheckedUpdateManyWithoutDepartmentNestedInput } from '../classification-department/classification-department-unchecked-update-many-without-department-nested.input';

@InputType()
export class DepartmentUncheckedUpdateWithoutLocationInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  organization_id?: string;

  @Field(() => String, { nullable: true })
  peoplesoft_id?: string;

  @Field(() => String, { nullable: true })
  code?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  effective_status?: string;

  @Field(() => Date, { nullable: true })
  effective_date?: Date | string;

  @Field(() => PositionRequestUncheckedUpdateManyWithoutDepartmentNestedInput, { nullable: true })
  PositionRequest?: PositionRequestUncheckedUpdateManyWithoutDepartmentNestedInput;

  @Field(() => PositionRequestUncheckedUpdateManyWithoutPaylist_departmentNestedInput, { nullable: true })
  PositionRequestsByPaylistDepartment?: PositionRequestUncheckedUpdateManyWithoutPaylist_departmentNestedInput;

  @Field(() => ClassificationDepartmentUncheckedUpdateManyWithoutDepartmentNestedInput, { nullable: true })
  classifications?: ClassificationDepartmentUncheckedUpdateManyWithoutDepartmentNestedInput;
}
