import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModelDefine } from '../app-config/app-config-entity.constant';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

@Module({
  imports: [MongooseModule.forFeature([CategoryModelDefine])],
  providers: [CategoryService],
  controllers: [CategoryController],
  exports: [CategoryService]
})
export class CategoryModule {}
