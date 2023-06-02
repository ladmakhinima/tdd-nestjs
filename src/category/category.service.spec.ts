import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { getModelToken } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './category.entity';
import { Model } from 'mongoose';

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
    it('create category successfully ...', () => {
      // ERROR 
      jest.spyOn(repository, 'create').mockReturnValueOnce(mockCreateCategory())
    });
  });
});
