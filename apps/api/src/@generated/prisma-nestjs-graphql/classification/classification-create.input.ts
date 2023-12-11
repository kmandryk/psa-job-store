import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateNestedManyWithoutClassificationInput } from '../job-profile/job-profile-create-nested-many-without-classification.input';
import { JobProfileReportsToCreateNestedManyWithoutClassificationInput } from '../job-profile-reports-to/job-profile-reports-to-create-nested-many-without-classification.input';

@InputType()
export class ClassificationCreateInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  code!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => JobProfileCreateNestedManyWithoutClassificationInput, { nullable: true })
  job_profiles?: JobProfileCreateNestedManyWithoutClassificationInput;

  @Field(() => JobProfileReportsToCreateNestedManyWithoutClassificationInput, { nullable: true })
  reportees?: JobProfileReportsToCreateNestedManyWithoutClassificationInput;
}
