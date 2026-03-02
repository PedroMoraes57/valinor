import { IsInt } from 'class-validator';

export class ReorderCardDto {
  @IsInt()
  id: number;

  @IsInt()
  order: number;

  @IsInt()
  columnId: number;
}

import { Type } from 'class-transformer';
import { ValidateNested, IsArray } from 'class-validator';

export class ReorderCardsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReorderCardDto)
  cards: ReorderCardDto[];
}
