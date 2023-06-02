import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateCategoryDTO {
  @IsOptional()
  @IsString()
  @MinLength(3)
  name: string;
}
