import { Module } from '@nestjs/common';
import { SupplierModule } from './supplier/supplier.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MaterialDefine } from '../app-config/app-config-entity.constant';

@Module({
  imports: [MongooseModule.forFeature([MaterialDefine]), SupplierModule],
})
export class MaterialModule {}
