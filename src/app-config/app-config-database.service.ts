import { Inject, Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigDatabaseService implements MongooseOptionsFactory {
  @Inject()
  private readonly configService: ConfigService;

  createMongooseOptions():
    | MongooseModuleOptions
    | Promise<MongooseModuleOptions> {
    return {
      uri: this.configService.get<string>('APP_CONFIG_DB'),
    };
  }
}
