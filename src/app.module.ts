import { Module } from '@nestjs/common';
import { AppConfigModule } from './app-config/app-config.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [AppConfigModule, CategoryModule],
})
export class AppModule {}
