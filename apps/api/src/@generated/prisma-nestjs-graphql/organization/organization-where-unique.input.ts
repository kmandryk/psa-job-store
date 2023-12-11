import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrganizationWhereInput } from './organization-where.input';
import { StringFilter } from '../prisma/string-filter.input';
import { DepartmentListRelationFilter } from '../department/department-list-relation-filter.input';
import { JobProfileListRelationFilter } from '../job-profile/job-profile-list-relation-filter.input';

@InputType()
export class OrganizationWhereUniqueInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => [OrganizationWhereInput], { nullable: true })
  AND?: Array<OrganizationWhereInput>;

  @Field(() => [OrganizationWhereInput], { nullable: true })
  OR?: Array<OrganizationWhereInput>;

  @Field(() => [OrganizationWhereInput], { nullable: true })
  NOT?: Array<OrganizationWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => DepartmentListRelationFilter, { nullable: true })
  departments?: DepartmentListRelationFilter;

  @Field(() => JobProfileListRelationFilter, { nullable: true })
  job_profiles?: JobProfileListRelationFilter;
}
