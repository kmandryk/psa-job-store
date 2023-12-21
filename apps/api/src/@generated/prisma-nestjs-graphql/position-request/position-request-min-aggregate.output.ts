import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { PositionRequestStatus } from '../prisma/position-request-status.enum';

@ObjectType()
export class PositionRequestMinAggregate {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: true })
  step?: number;

  @Field(() => Int, { nullable: true })
  reports_to_position_id?: number;

  @Field(() => Int, { nullable: true })
  parent_job_profile_id?: number;

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
  submission_id?: string;

  @Field(() => PositionRequestStatus, { nullable: true })
  status?: keyof typeof PositionRequestStatus;
}