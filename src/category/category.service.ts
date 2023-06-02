import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './category.entity';
import { Model } from 'mongoose';
import { CreateCategoryDTO } from './dtos';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async create(dto: CreateCategoryDTO) {
    const duplicatedCategory = await this.find({ name: dto.name });
    if (duplicatedCategory) {
      throw new ConflictException('category duplicated by name');
    }
    return this.categoryModel.create({ name: dto.name });
  }

  async find(where: Partial<Category>, throwNotFoundErr = false) {
    const category = await this.categoryModel.findOne(where);
    if (throwNotFoundErr && !category) {
      throw new NotFoundException('category is not found ...');
    }
    return category;
  }

  findAll() {
    return this.categoryModel.find();
  }
}
