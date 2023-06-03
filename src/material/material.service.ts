import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMaterialDTO } from './dtos';
import { Material } from './material.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryService } from '../category/category.service';

@Injectable()
export class MaterialService {
  constructor(
    @InjectModel(Material.name) private readonly materialModel: Model<Material>,
    private readonly categoryService: CategoryService,
  ) {}

  async createMaterial(dto: CreateMaterialDTO) {
    const duplicateMaterialByName = await this.findOneMaterial({
      name: dto.name,
    });
    if (duplicateMaterialByName) {
      throw new ConflictException('material duplicated by name');
    }
    const category = await this.categoryService.find(
      {
        name: dto.name,
      },
      true,
    );
    return this.materialModel.create({
      name: dto.name,
      category: category.name,
      stock: dto.stock,
      suppliers: dto.suppliers,
      unitOfMeasurement: { name: 'dollar', symbol: '$' },
    });
  }

  editMaterialStock() {}

  editCategory() {}

  findAllMaterials() {}

  async findOneMaterial(where: Partial<Material>, throwNotFoundErr = false) {
    const material = this.materialModel.findOne(where);
    if (throwNotFoundErr && !material) {
      throw new NotFoundException('material not found');
    }
    return material;
  }
}
