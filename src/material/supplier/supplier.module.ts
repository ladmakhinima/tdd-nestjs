import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MaterialSupplierDefine } from '../../app-config/app-config-entity.constant';

@Module({
  imports: [MongooseModule.forFeature([MaterialSupplierDefine])],
})
export class SupplierModule {}
