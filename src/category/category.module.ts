import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModelDefine } from 'src/app-config/app-config-entity.constant';
import { CategoryService } from './category.service';

@Module({
  imports: [MongooseModule.forFeature([CategoryModelDefine])],
  providers: [CategoryService],
})
export class CategoryModule {}
