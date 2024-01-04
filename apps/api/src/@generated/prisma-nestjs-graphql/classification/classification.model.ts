import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { JobProfileClassification } from '../job-profile-classification/job-profile-classification.model';
import { JobProfileReportsTo } from '../job-profile-reports-to/job-profile-reports-to.model';

@ObjectType()
export class Classification {
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
  effective_date!: Date;

  @Field(() => [JobProfileClassification], { nullable: true })
  job_profiles?: Array<JobProfileClassification>;

  @Field(() => [JobProfileReportsTo], { nullable: true })
  reportees?: Array<JobProfileReportsTo>;
}
