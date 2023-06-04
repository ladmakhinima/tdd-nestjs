import { ModelDefinition } from '@nestjs/mongoose';
import { Category, CategorySchema } from '../category/category.entity';
import { Material, MaterialSchema } from '../material/material.entity';

export const CategoryModelDefine: ModelDefinition = {
  name: Category.name,
  schema: CategorySchema,
  collection: 'categories',
};

export const MaterialDefine: ModelDefinition = {
  name: Material.name,
  schema: MaterialSchema,
  collection: 'materials',
};
