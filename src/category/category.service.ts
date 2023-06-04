import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './category.entity';
import { Model } from 'mongoose';
import { CreateCategoryDTO, UpdateCategoryDTO } from './dtos';
import { SendUpdatedCategoryEvent } from './decorators';
import { EventService } from '../common/event/event.service';

@Injectable()
export class CategoryService {
  

  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
    public readonly eventEmitter: EventService
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

  @SendUpdatedCategoryEvent()
  async updateName(_id: string, dto: UpdateCategoryDTO) {
    const category = await this.find({ _id }, true);
    await this.categoryModel.updateOne({ _id }, { $set: { name: dto.name } });
    return {
      oldCategory: category.name,
      newCategory: dto.name,
      _id,
    };
  }
}
