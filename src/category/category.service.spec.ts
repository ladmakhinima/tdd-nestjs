import { Model } from 'mongoose';
import { CategoryService } from './category.service';
import { Category, CategoryDocument } from './category.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ConflictException, NotFoundException } from '@nestjs/common';
import {
  mockCreateCategoryDto,
  mockCreateCategoryResult,
  mockCategories,
} from './category.stub';
import { EventService } from '../common/event/event.service';

describe('Category Service', () => {
  let service: CategoryService;
  let repositoryMongoose: Model<CategoryDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
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
        {
          provide: EventService,
          useValue: {
            emit: jest.fn(),
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

  describe('Test FindAll Category', () => {
    it('find all category result should be equal with mongoose find method', () => {
      jest
        .spyOn(repositoryMongoose, 'find')
        .mockResolvedValueOnce(mockCategories());
      expect(service.findAll()).resolves.toEqual(mockCategories());
    });

    it('find method in mongoose should called once', () => {
      const spyFindAll = jest.spyOn(repositoryMongoose, 'find');
      service.findAll();
      expect(spyFindAll).toBeCalledTimes(1);
    });
  });

  describe('Test Find Category', () => {
    it('find method should return anything that returned by categoryModel findone', () => {
      jest
        .spyOn(repositoryMongoose, 'findOne')
        .mockResolvedValueOnce(mockCreateCategoryResult());
      expect(
        service.find({ name: mockCreateCategoryDto().name }),
      ).resolves.toEqual(mockCreateCategoryResult());
    });

    it('find method should return notfound exception when no category found and throwNotFoundError param Become true', () => {
      jest
        .spyOn(repositoryMongoose, 'findOne')
        .mockResolvedValueOnce(undefined);
      expect(service.find({ name: 'anything' }, true)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
    it('find method should not return notfound exception when no category found and not passed any param as throwNotFoundError', () => {
      jest
        .spyOn(repositoryMongoose, 'findOne')
        .mockResolvedValueOnce(undefined);
      expect(service.find({ name: 'anything' })).resolves.toEqual(undefined);
    });
    it('when find method called, the findOne should called once', () => {
      const spyFindOneMongooseRepo = jest.spyOn(repositoryMongoose, 'findOne');
      service.find({ name: mockCreateCategoryDto().name }).then(() => {
        expect(spyFindOneMongooseRepo).toBeCalledTimes(1);
      });
    });
    it('when find method called, the findOne should called with correct param', async () => {
      const spyFindOneMongooseRepo = jest.spyOn(repositoryMongoose, 'findOne');
      service.find({ name: mockCreateCategoryDto().name });
      expect(spyFindOneMongooseRepo).toHaveBeenCalledWith({
        name: mockCreateCategoryDto().name,
      });
    });
  });
});
