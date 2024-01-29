import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class JobProfileJobFamilyLinkJobProfileIdJobFamilyIdCompoundUniqueInput {
  @Field(() => Int, { nullable: false })
  jobProfileId!: number;

  @Field(() => Int, { nullable: false })
  jobFamilyId!: number;
}