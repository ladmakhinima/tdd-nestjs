import { Module } from '@nestjs/common';
import { AppConfigModule } from './app-config/app-config.module';
import { CategoryModule } from './category/category.module';
import { MaterialModule } from './material/material.module';

@Module({
  imports: [AppConfigModule, CategoryModule, MaterialModule],
})
export class AppModule {}
