import { ModelDefinition } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/category/category.entity';

export const CategoryModelDefine: ModelDefinition = {
  name: Category.name,
  schema: CategorySchema,
  collection: 'categories',
};
