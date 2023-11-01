import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { BehaviouralCompetencyWhereUniqueInput } from './behavioural-competency-where-unique.input';
import { Type } from 'class-transformer';
import { BehaviouralCompetencyUpdateWithoutMinistryInput } from './behavioural-competency-update-without-ministry.input';
import { BehaviouralCompetencyCreateWithoutMinistryInput } from './behavioural-competency-create-without-ministry.input';

@InputType()
export class BehaviouralCompetencyUpsertWithWhereUniqueWithoutMinistryInput {
  @Field(() => BehaviouralCompetencyWhereUniqueInput, { nullable: false })
  @Type(() => BehaviouralCompetencyWhereUniqueInput)
  where!: Prisma.AtLeast<BehaviouralCompetencyWhereUniqueInput, 'id'>;

  @Field(() => BehaviouralCompetencyUpdateWithoutMinistryInput, { nullable: false })
  @Type(() => BehaviouralCompetencyUpdateWithoutMinistryInput)
  update!: BehaviouralCompetencyUpdateWithoutMinistryInput;

  @Field(() => BehaviouralCompetencyCreateWithoutMinistryInput, { nullable: false })
  @Type(() => BehaviouralCompetencyCreateWithoutMinistryInput)
  create!: BehaviouralCompetencyCreateWithoutMinistryInput;
}
