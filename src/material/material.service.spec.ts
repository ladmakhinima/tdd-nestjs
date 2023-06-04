import { Model } from 'mongoose';
import { MaterialService } from './material.service';
import { Material, MaterialDocument } from './material.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { CreateMaterialDTO } from './dtos';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { CategoryService } from '../category/category.service';
import { mockCreateCategoryResult } from '../category/category.stub';

const mockMaterialDto = (): CreateMaterialDTO => ({
  name: 'something ..',
  category: 'something as category ...',
  stock: 2,
  unitOfMeasurement: {
    name: '...',
    symbol: '$',
  },
  suppliers: [{ fullName: 'john doe', basePrice: 100 }],
});

const mockMaterialResult = () => ({
  _id: 'bing ...',
  ...mockMaterialDto(),
});

describe('Material Service', () => {
  let service: MaterialService;
  let materialModel: Model<MaterialDocument>;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        MaterialService,
        {
          provide: CategoryService,
          useValue: {
            find: jest.fn(),
          },
        },
        {
          provide: getModelToken(Material.name),
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
            updateOne: jest.fn(),
          },
        },
      ],
    }).compile();
    service = module.get<MaterialService>(MaterialService);
    materialModel = module.get<Model<MaterialDocument>>(
      getModelToken(Material.name),
    );
    categoryService = module.get<CategoryService>(CategoryService);
  });

  describe('Create Material', () => {
    it('find one material should called once', async () => {
      const spyFindOneMaterial = jest.spyOn(service, 'findOneMaterial');
      jest
        .spyOn(categoryService, 'find')
        .mockResolvedValueOnce(mockCreateCategoryResult() as any);
      await service.createMaterial(mockMaterialDto());
      expect(spyFindOneMaterial).toHaveBeenCalledTimes(1);
    });
    it('find one material should called with correct parameters', async () => {
      const spyFindOneMaterial = jest.spyOn(service, 'findOneMaterial');
      jest
        .spyOn(categoryService, 'find')
        .mockResolvedValueOnce(mockCreateCategoryResult() as any);
      await service.createMaterial(mockMaterialDto());
      expect(spyFindOneMaterial).toHaveBeenCalledWith({
        name: mockMaterialDto().name,
      });
    });
    it('category service find should called once', async () => {
      const spyCategoryServiceFind = jest
        .spyOn(categoryService, 'find')
        .mockResolvedValueOnce(mockCreateCategoryResult() as any);
      await service.createMaterial(mockMaterialDto());

      expect(spyCategoryServiceFind).toHaveBeenCalledTimes(1);
    });
    it('category service find should called with correct parameters', async () => {
      const spyCategoryServiceFind = jest
        .spyOn(categoryService, 'find')
        .mockResolvedValueOnce(mockCreateCategoryResult() as any);
      await service.createMaterial(mockMaterialDto());

      expect(spyCategoryServiceFind).toHaveBeenCalledWith(
        {
          name: mockMaterialDto().category,
        },
        true,
      );
    });

    it('create material should throw exception when findOneMaterial return duplicated material', () => {
      jest
        .spyOn(service, 'findOneMaterial')
        .mockResolvedValueOnce(mockMaterialResult() as any);

      expect(service.createMaterial(mockMaterialDto())).rejects.toBeInstanceOf(
        ConflictException,
      );
    });

    it('create material should not throw exception when findOneMaterial not found any duplicated material', async () => {
      jest.spyOn(service, 'findOneMaterial').mockResolvedValueOnce(undefined);
      const spyCategoryServiceFind = jest
        .spyOn(categoryService, 'find')
        .mockResolvedValueOnce(mockCreateCategoryResult() as any);
      const spyMaterialModelCreate = jest.spyOn(materialModel, 'create');
      await service.createMaterial(mockMaterialDto());
      expect(spyCategoryServiceFind).toHaveBeenCalledTimes(1);
      expect(spyMaterialModelCreate).toHaveBeenCalledTimes(1);
    });

    it('create material should throw exception when category service dont find any related category', async () => {
      jest
        .spyOn(categoryService, 'find')
        .mockRejectedValueOnce(
          new NotFoundException('category is not found ...'),
        );
      const spyMaterialModelCreate = jest.spyOn(materialModel, 'create');
      await expect(
        service.createMaterial(mockMaterialDto()),
      ).rejects.toBeInstanceOf(NotFoundException);
      expect(spyMaterialModelCreate).toHaveBeenCalledTimes(0);
    });
    it('create material should not throw exception when category service find specefic category', async () => {
      jest
        .spyOn(categoryService, 'find')
        .mockResolvedValueOnce(mockCreateCategoryResult() as any);
      const spyMaterialModelCreate = jest.spyOn(materialModel, 'create');
      await service.createMaterial(mockMaterialDto());
      expect(spyMaterialModelCreate).toHaveBeenCalledTimes(1);
    });

    it('create material should return anything that returned by material model create method', async () => {
      jest
        .spyOn(categoryService, 'find')
        .mockResolvedValueOnce(mockCreateCategoryResult() as any);

      jest
        .spyOn(materialModel, 'create')
        .mockResolvedValueOnce(mockMaterialResult() as any);

      await expect(service.createMaterial(mockMaterialDto())).resolves.toEqual(
        mockMaterialResult(),
      );
    });
  });

  describe('Find One Material', () => {
    it('find one material service should return anything that returned by material model findone', async () => {
      jest
        .spyOn(materialModel, 'findOne')
        .mockResolvedValueOnce(mockMaterialResult());
      await expect(
        service.findOneMaterial({ _id: mockMaterialResult()._id }),
      ).resolves.toEqual(mockMaterialResult());
    });

    it('should return exception if material model findone not found anything and throwNotFoundErr set to true', async () => {
      jest.spyOn(materialModel, 'findOne').mockResolvedValueOnce(undefined);
      await expect(
        service.findOneMaterial({ _id: mockCreateCategoryResult().id }, true),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
    it('should not return exception if material model findone not found anything and throwNotFoundErr set to false', async () => {
      jest.spyOn(materialModel, 'findOne').mockResolvedValueOnce(undefined);
      await expect(
        service.findOneMaterial({ _id: mockCreateCategoryResult().id }, false),
      ).resolves.toEqual(undefined);
    });
  });

  describe('Edit Material Stock', () => {
    it('it should be throw an not found exception, if material not found', async () => {
      jest
        .spyOn(service, 'findOneMaterial')
        .mockRejectedValueOnce(new NotFoundException('material not found'));
      await expect(
        service.editMaterialStock(mockCreateCategoryResult().id, { stock: 1 }),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
    it('it should call the updateOne , if material is found', async () => {
      jest
        .spyOn(service, 'findOneMaterial')
        .mockResolvedValueOnce(mockMaterialResult() as any);

      const spyUpdateOne = jest.spyOn(materialModel, 'updateOne');

      await service.editMaterialStock(mockMaterialResult()._id, { stock: 1 });

      expect(spyUpdateOne).toHaveBeenCalled();
    });
    it('it should return anything that updateOne method returned ...', async () => {
      jest
        .spyOn(service, 'findOneMaterial')
        .mockResolvedValueOnce(mockMaterialResult() as any);
      jest
        .spyOn(materialModel, 'updateOne')
        .mockResolvedValueOnce(mockMaterialResult() as any);
      await expect(
        service.editMaterialStock(mockMaterialResult()._id, { stock: 1 }),
      ).resolves.toEqual(mockMaterialResult());
    });
  });

  describe('Add Or Update Supplier Material', () => {});
});
