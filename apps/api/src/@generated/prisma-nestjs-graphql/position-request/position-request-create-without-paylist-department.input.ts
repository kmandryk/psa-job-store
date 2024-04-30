import { Field, InputType, Int } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { DepartmentCreateNestedOneWithoutPositionRequestInput } from '../department/department-create-nested-one-without-position-request.input';
import { JobProfileCreateNestedOneWithoutPosition_requestInput } from '../job-profile/job-profile-create-nested-one-without-position-request.input';
import { LocationCreateNestedOneWithoutPositionRequestsInput } from '../location/location-create-nested-one-without-position-requests.input';
import { PositionRequestStatus } from '../prisma/position-request-status.enum';

@InputType()
export class PositionRequestCreateWithoutPaylist_departmentInput {
  @Field(() => Int, { nullable: true })
  crm_id?: number;

  @Field(() => Int, { nullable: true })
  crm_assigned_to_account_id?: number;

  @Field(() => Int, { nullable: false })
  step!: number;

  @Field(() => String, { nullable: false })
  reports_to_position_id!: string;

  @Field(() => GraphQLJSON, { nullable: true })
  crm_json?: any;

  @Field(() => GraphQLJSON, { nullable: true })
  profile_json?: any;

  @Field(() => GraphQLJSON, { nullable: true })
  orgchart_json?: any;

  @Field(() => String, { nullable: true })
  user_id?: string;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => Int, { nullable: true })
  position_number?: number;

  @Field(() => String, { nullable: true })
  classification_id?: string;

  @Field(() => String, { nullable: true })
  classification_code?: string;

  @Field(() => String, { nullable: true })
  user_name?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  submission_id?: string;

  @Field(() => Date, { nullable: true })
  submitted_at?: Date | string;

  @Field(() => Date, { nullable: true })
  approved_at?: Date | string;

  @Field(() => PositionRequestStatus, { nullable: true })
  status?: keyof typeof PositionRequestStatus;

  @Field(() => Date, { nullable: true })
  updated_at?: Date | string;

  @Field(() => String, { nullable: true })
  shareUUID?: string;

  @Field(() => String, { nullable: true })
  additional_info_excluded_mgr_position_number?: string;

  @Field(() => String, { nullable: true })
  additional_info_comments?: string;

  @Field(() => GraphQLJSON, { nullable: true })
  additional_info?: any;

  @Field(() => JobProfileCreateNestedOneWithoutPosition_requestInput, { nullable: true })
  parent_job_profile?: JobProfileCreateNestedOneWithoutPosition_requestInput;

  @Field(() => DepartmentCreateNestedOneWithoutPositionRequestInput, { nullable: false })
  department!: DepartmentCreateNestedOneWithoutPositionRequestInput;

  @Field(() => LocationCreateNestedOneWithoutPositionRequestsInput, { nullable: true })
  workLocation?: LocationCreateNestedOneWithoutPositionRequestsInput;
}
