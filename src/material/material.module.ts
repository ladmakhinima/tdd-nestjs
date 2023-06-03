import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MaterialDefine } from '../app-config/app-config-entity.constant';
import { MaterialService } from './material.service';

@Module({
  imports: [MongooseModule.forFeature([MaterialDefine])],
  providers: [MaterialService],
})
export class MaterialModule {}
