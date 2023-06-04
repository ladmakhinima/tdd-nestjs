import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MaterialDefine } from '../app-config/app-config-entity.constant';
import { MaterialService } from './material.service';
import { MaterialController } from './material.controller';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [MongooseModule.forFeature([MaterialDefine]), CategoryModule],
  providers: [MaterialService],
  controllers: [MaterialController],
})
export class MaterialModule {}
