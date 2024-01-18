import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class JobProfileProfessionalDesignationUncheckedUpdateWithoutJob_profileInput {
  @Field(() => Int, { nullable: true })
  professional_designation_id?: number;
}
