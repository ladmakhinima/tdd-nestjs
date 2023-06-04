import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MaterialService } from './material.service';
import {
  CreateMaterialDTO,
  CreateMaterialSupplierDTO,
  EditMaterialStockDTO,
} from './dtos';
import { IsMongoIDPipe } from '../common/pipes';

@Controller('material')
export class MaterialController {
  @Inject()
  private readonly materialService: MaterialService;

  @Post()
  createMaterial(@Body() body: CreateMaterialDTO) {
    return this.materialService.createMaterial(body);
  }

  @Get()
  getMaterials() {
    return this.materialService.findAllMaterials();
  }

  @Get(':id')
  getMaterialById(@Param('id', IsMongoIDPipe) _id: string) {
    return this.materialService.findOneMaterial({ _id }, true);
  }

  @Patch('supplier/:id')
  addOrUpdateSupplierMaterial(
    @Param('id', IsMongoIDPipe) id: string,
    @Body() body: CreateMaterialSupplierDTO,
  ) {
    return this.materialService.addOrUpdateSupplierMaterial(id, body);
  }

  @Patch(':id')
  updateMaterialsStock(
    @Param('id', IsMongoIDPipe) _id: string,
    @Body() body: EditMaterialStockDTO,
  ) {
    return this.materialService.editMaterialStock(_id, body);
  }
}
