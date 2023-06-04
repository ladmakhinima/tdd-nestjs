import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateMaterialDTO,
  CreateMaterialSupplierDTO,
  EditMaterialStockDTO,
} from './dtos';
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
        name: dto.category,
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

  async editMaterialStock(_id: string, dto: EditMaterialStockDTO) {
    const material = await this.findOneMaterial({ _id }, true);
    return this.materialModel.updateOne(
      { _id: material._id },
      {
        $set: {
          stock: material.stock + dto.stock,
        },
      },
      {
        new: true,
      },
    );
  }

  async findOneMaterial(where: Partial<Material>, throwNotFoundErr = false) {
    const material = await this.materialModel.findOne(where);
    if (throwNotFoundErr && !material) {
      throw new NotFoundException('material not found');
    }
    return material;
  }

  async addOrUpdateSupplierMaterial(
    _id: string,
    dto: CreateMaterialSupplierDTO,
  ) {
    const material = await this.findOneMaterial({ _id }, true);
    const materialSupplierIndex = material.suppliers.findIndex(
      (element) => element.fullName === dto.fullName,
    );
    if (materialSupplierIndex > -1) {
      material.suppliers[materialSupplierIndex].basePrice = dto.basePrice;
    } else {
      material.suppliers.push(dto);
    }
    return material.save();
  }

  findAllMaterials() {
    return this.materialModel.find();
  }

  async updateAllCategoriesOfMaterial(
    oldCategory: string,
    newCategory: string,
  ) {
    const materials = await this.materialModel.find({ category: oldCategory });
    if (materials.length === 0) {
      throw new BadRequestException(
        'not found any materials with these categories ...',
      );
    }
    return await this.materialModel.updateMany(
      { _id: materials.map((e) => e.id) },
      { $set: { category: newCategory } },
      { new: true },
    );
  }
}
