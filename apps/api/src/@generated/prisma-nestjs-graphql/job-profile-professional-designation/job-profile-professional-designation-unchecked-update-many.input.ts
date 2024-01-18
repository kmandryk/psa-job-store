import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class JobProfileProfessionalDesignationUncheckedUpdateManyInput {
  @Field(() => Int, { nullable: true })
  job_profile_id?: number;

  @Field(() => Int, { nullable: true })
  professional_designation_id?: number;
}
