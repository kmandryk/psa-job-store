import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileBehaviouralCompetencyCreateWithoutBehavioural_competencyInput } from './job-profile-behavioural-competency-create-without-behavioural-competency.input';
import { JobProfileBehaviouralCompetencyUpdateWithoutBehavioural_competencyInput } from './job-profile-behavioural-competency-update-without-behavioural-competency.input';
import { JobProfileBehaviouralCompetencyWhereUniqueInput } from './job-profile-behavioural-competency-where-unique.input';

@InputType()
export class JobProfileBehaviouralCompetencyUpsertWithWhereUniqueWithoutBehavioural_competencyInput {
  @Field(() => JobProfileBehaviouralCompetencyWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileBehaviouralCompetencyWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileBehaviouralCompetencyWhereUniqueInput, 'behavioural_competency_id_job_profile_id'>;

  @Field(() => JobProfileBehaviouralCompetencyUpdateWithoutBehavioural_competencyInput, { nullable: false })
  @Type(() => JobProfileBehaviouralCompetencyUpdateWithoutBehavioural_competencyInput)
  update!: JobProfileBehaviouralCompetencyUpdateWithoutBehavioural_competencyInput;

  @Field(() => JobProfileBehaviouralCompetencyCreateWithoutBehavioural_competencyInput, { nullable: false })
  @Type(() => JobProfileBehaviouralCompetencyCreateWithoutBehavioural_competencyInput)
  create!: JobProfileBehaviouralCompetencyCreateWithoutBehavioural_competencyInput;
}
