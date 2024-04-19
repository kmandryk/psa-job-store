import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class ScheduledTaskMetadataUncheckedUpdateManyInput {
  @Field(() => String, { nullable: true })
  task?: string;

  @Field(() => Int, { nullable: true })
  frequency?: number;

  @Field(() => Date, { nullable: true })
  last_run_at?: Date | string;
}
