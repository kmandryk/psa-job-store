import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobStream } from '../prisma/job-stream.enum';
import { JobProfileBehaviouralCompetency } from '../job-profile-behavioural-competency/job-profile-behavioural-competency.model';
import { JobProfileReportsTo } from '../job-profile-reports-to/job-profile-reports-to.model';
import { JobCategory } from '../job-category/job-category.model';
import { Classification } from '../classification/classification.model';
import { JobFamily } from '../job-family/job-family.model';
import { Ministry } from '../ministry/ministry.model';
import { JobRole } from '../job-role/job-role.model';

@ObjectType()
export class JobProfile {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: true })
  category_id!: number | null;

  @Field(() => Int, { nullable: false })
  classification_id!: number;

  @Field(() => Int, { nullable: true })
  family_id!: number | null;

  @Field(() => Int, { nullable: true })
  ministry_id!: number | null;

  @Field(() => Int, { nullable: true })
  role_id!: number | null;

  @Field(() => JobStream, { nullable: false })
  stream!: keyof typeof JobStream;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => Int, { nullable: false })
  number!: number;

  @Field(() => String, { nullable: false })
  context!: string;

  @Field(() => String, { nullable: false })
  overview!: string;

  @Field(() => [String], { nullable: true })
  accountabilities_required!: Array<string>;

  @Field(() => [String], { nullable: true })
  accountabilities_optional!: Array<string>;

  @Field(() => [String], { nullable: true })
  requirements!: Array<string>;

  @Field(() => [JobProfileBehaviouralCompetency], { nullable: true })
  behavioural_competencies?: Array<JobProfileBehaviouralCompetency>;

  @Field(() => [JobProfileReportsTo], { nullable: true })
  reports_to?: Array<JobProfileReportsTo>;

  @Field(() => JobCategory, { nullable: true })
  category?: JobCategory | null;

  @Field(() => Classification, { nullable: false })
  classification?: Classification;

  @Field(() => JobFamily, { nullable: true })
  family?: JobFamily | null;

  @Field(() => Ministry, { nullable: true })
  ministry?: Ministry | null;

  @Field(() => JobRole, { nullable: true })
  role?: JobRole | null;
}
