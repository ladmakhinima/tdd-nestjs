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
    it('category should be created successfully', async () => {
      jest
        .spyOn(repositoryMongoose, 'create')
        .mockResolvedValueOnce(mockCreateCategoryResult() as any);

      const result = await service.create(mockCreateCategoryDto());
      expect(result).toEqual(mockCreateCategoryResult());
    });
    it('category find method should called with correct parameters', async () => {
      jest.spyOn(service, 'find');
      await service.create(mockCreateCategoryDto());
      expect(service.find).toBeCalledWith({
        name: mockCreateCategoryDto().name,
      });
    });
    it('category should throw error with exception', async () => {
      jest
        .spyOn(service, 'find')
        .mockReturnValueOnce(
          new ConflictException('category duplicated by name') as any,
        );

      service
        .create(mockCreateCategoryDto())
        .then((result) => {
          expect(result).not.toBe(undefined);
        })
        .catch((err) => {
          expect(err?.message).toEqual('category duplicated by name');
        });
    });
  });
});
