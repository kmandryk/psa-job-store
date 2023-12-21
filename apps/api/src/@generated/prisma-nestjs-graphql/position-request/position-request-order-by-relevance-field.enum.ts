import { registerEnumType } from '@nestjs/graphql';

export enum PositionRequestOrderByRelevanceFieldEnum {
  user_id = 'user_id',
  title = 'title',
  classification_id = 'classification_id',
  classification_code = 'classification_code',
  submission_id = 'submission_id',
}

registerEnumType(PositionRequestOrderByRelevanceFieldEnum, {
  name: 'PositionRequestOrderByRelevanceFieldEnum',
  description: undefined,
});