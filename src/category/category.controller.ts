import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateCategoryDTO, UpdateCategoryDTO } from './dtos';
import { CategoryService } from './category.service';
import { IsMongoIDPipe } from '../common/pipes';

@Controller('category')
export class CategoryController {
  @Inject(CategoryService)
  private readonly categoryService: CategoryService;

  @Post()
  createCategoryAction(@Body() body: CreateCategoryDTO) {
    return this.categoryService.create(body);
  }

  @Get()
  findCategoriesAction() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findCategoryById(@Param('id', IsMongoIDPipe) _id: string) {
    return this.categoryService.find({ _id }, true);
  }

  @Patch(':id')
  updateCategoryById(
    @Param('id', IsMongoIDPipe) id: string,
    @Body() body: UpdateCategoryDTO,
  ) {
    return this.categoryService.updateName(id, body);
  }
}
