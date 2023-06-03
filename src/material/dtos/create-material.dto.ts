import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class CreateMaterialDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  suppliers: Record<string, number>[];

  @IsNotEmpty()
  @IsInt()
  stock: number;

  @IsNotEmpty()
  @MinLength(3, { each: true })
  unitOfMeasurement: Record<string, string>;
}
