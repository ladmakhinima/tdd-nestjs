import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class CreateMaterialSupplierDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  fullName: string;

  @IsNotEmpty()
  @IsNumber()
  basePrice: number;
}

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
  suppliers: CreateMaterialSupplierDTO[];

  @IsNotEmpty()
  @IsInt()
  stock: number;

  @IsNotEmpty()
  unitOfMeasurement: Record<string, string>;
}
