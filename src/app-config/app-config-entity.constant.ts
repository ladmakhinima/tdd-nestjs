import { ModelDefinition } from '@nestjs/mongoose';
import { Category, CategorySchema } from '../category/category.entity';
import { Material, MaterialSchema } from '../material/material.entity';
import {
  Supplier,
  SupplierSchema,
} from 'src/material/supplier/supplier.entity';

export const CategoryModelDefine: ModelDefinition = {
  name: Category.name,
  schema: CategorySchema,
  collection: 'categories',
};

export const MaterialSupplierDefine: ModelDefinition = {
  name: Supplier.name,
  schema: SupplierSchema,
  collection: 'suppliers',
};

export const MaterialDefine: ModelDefinition = {
  name: Material.name,
  schema: MaterialSchema,
  collection: 'materials',
};
