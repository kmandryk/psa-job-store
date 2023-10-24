import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IdentityUncheckedUpdateManyWithoutUserNestedInput } from '../identity/identity-unchecked-update-many-without-user-nested.input';

@InputType()
export class UserUncheckedUpdateInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => [String], { nullable: true })
  roles?: Array<string>;

  @Field(() => Date, { nullable: true })
  created_at?: Date | string;

  @Field(() => Date, { nullable: true })
  updated_at?: Date | string;

  @Field(() => Date, { nullable: true })
  deleted_at?: Date | string;

  @Field(() => IdentityUncheckedUpdateManyWithoutUserNestedInput, { nullable: true })
  identities?: IdentityUncheckedUpdateManyWithoutUserNestedInput;
}
