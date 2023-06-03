import { Model } from 'mongoose';
import { CategoryService } from './category.service';
import { Category, CategoryDocument } from './category.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ConflictException } from '@nestjs/common';

const mockCreateCategoryDto = () => ({
  name: 'something ...',
});

const mockCreateCategoryResult = () => ({
  name: 'something',
  id: 'object id ...',
});

describe('Category Service', () => {
  let service: CategoryService;
  let repositoryMongoose: Model<CategoryDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getModelToken(Category.name),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    repositoryMongoose = module.get<Model<CategoryDocument>>(
      getModelToken(Category.name),
    );
  });

  describe('Test Create Category', () => {
    it('category should be created successfully', () => {
      jest
        .spyOn(repositoryMongoose, 'create')
        .mockResolvedValueOnce(mockCreateCategoryResult() as any);

      expect(service.create(mockCreateCategoryDto())).resolves.toEqual(
        mockCreateCategoryResult(),
      );
    });
    it('category find method should called with correct parameters', async () => {
      const spyFindCategory = jest.spyOn(service, 'find');
      await service.create(mockCreateCategoryDto());
      expect(spyFindCategory).toBeCalledWith({
        name: mockCreateCategoryDto().name,
      });
    });
    it('category should throw error with exception', () => {
      jest
        .spyOn(service, 'find')
        .mockReturnValueOnce(
          new ConflictException('category duplicated by name') as any,
        );
      expect(service.create(mockCreateCategoryDto())).rejects.toBeInstanceOf(
        ConflictException,
      );
    });
  });
});
