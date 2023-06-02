import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { getModelToken } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './category.entity';
import { Model } from 'mongoose';
import { BadRequestException, ConflictException } from '@nestjs/common';

const mockCreateCategory = () => ({
  _id: 'anyid',
  name: 'anyname',
});

const mockCreateCategoryDTO = () => ({
  name: 'anyid',
});

describe('CategoryService', () => {
  let service: CategoryService;
  let repository: Model<CategoryDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getModelToken(Category.name),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();
    service = module.get<CategoryService>(CategoryService);
    repository = module.get<Model<CategoryDocument>>(
      getModelToken(Category.name),
    );
  });
  it('category service should be defined ...', () => {
    expect(service).toBeDefined();
  });
  describe('create category', () => {
    it('create category successfully ...', async () => {
      jest
        .spyOn(repository, 'create')
        .mockReturnValueOnce(mockCreateCategory() as any);
      const result = await service.create(mockCreateCategoryDTO());
      expect(result).toEqual(mockCreateCategory());
      expect(repository.create).toBeCalledTimes(1);
      expect(repository.create).toBeCalledWith(mockCreateCategoryDTO());
    });

    it('create category: duplicate name error', async () => {
      jest
        .spyOn(service, 'create')
        .mockReturnValueOnce(
          new ConflictException('category duplicated by name') as any,
        );

      const result = await service.create(mockCreateCategoryDTO());
      expect(service.create).toBeCalledWith(mockCreateCategoryDTO());
      expect(result).toEqual(
        new ConflictException('category duplicated by name'),
      );
    });
  });
  describe('find category', () => {
    it('find successfully', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockReturnValueOnce(mockCreateCategory() as any);

      const result = await service.find({ name: mockCreateCategoryDTO().name });
      expect(result).toEqual(mockCreateCategory());
      expect(repository.findOne).toHaveBeenCalled();
      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.findOne).toHaveBeenCalledWith({
        name: mockCreateCategoryDTO().name,
      });
    });

    it('find : not found error', async () => {
      jest
        .spyOn(service, 'find')
        .mockReturnValueOnce(
          new BadRequestException('category is not found ...') as any,
        );

      const result = await service.find({ name: mockCreateCategoryDTO().name });

      expect(result).toEqual(
        new BadRequestException('category is not found ...') as any,
      );
    });
  });
});
