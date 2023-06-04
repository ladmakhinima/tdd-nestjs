import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UPDATE_CATEGORY } from '../app-config/app-events.constant';
import { MaterialService } from './material.service';
import { OnCategoryUpdateType } from './types';
import { ReceiveEventPayload } from '../common/event/types';

@Injectable()
export class MaterialEvent {
  @Inject(MaterialService)
  private readonly materialService: MaterialService;

  @OnEvent(UPDATE_CATEGORY)
  async onUpdateCategory(data: ReceiveEventPayload<OnCategoryUpdateType>) {
    await this.materialService.updateAllCategoriesOfMaterial(
      data.payload.oldCategory,
      data.payload.newCategory,
    );
  }
}
