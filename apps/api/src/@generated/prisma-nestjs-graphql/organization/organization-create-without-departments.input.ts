import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateNestedManyWithoutOrganizationInput } from '../job-profile/job-profile-create-nested-many-without-organization.input';

@InputType()
export class OrganizationCreateWithoutDepartmentsInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  peoplesoft_id!: string;

  @Field(() => String, { nullable: false })
  code!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  effective_status!: string;

  @Field(() => Date, { nullable: false })
  effective_date!: Date | string;

  @Field(() => JobProfileCreateNestedManyWithoutOrganizationInput, { nullable: true })
  job_profiles?: JobProfileCreateNestedManyWithoutOrganizationInput;
}
