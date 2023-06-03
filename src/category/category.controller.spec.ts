import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import {
  mockCategories,
  mockCreateCategoryDto,
  mockCreateCategoryResult,
} from './category.stub';
import { NotFoundException } from '@nestjs/common';

describe('Categories Controller', () => {
  let controller: CategoryController;
  let service: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    service = module.get<CategoryService>(CategoryService);
  });

  describe('Create Category Action', () => {
    it('create category action should return anything that returned by categoryService create method', () => {
      jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(mockCreateCategoryResult() as any);
      expect(
        controller.createCategoryAction(mockCreateCategoryDto()),
      ).resolves.toEqual(mockCreateCategoryResult());
    });
    it('category service ,create method should called with correct params', () => {
      const spyCategoryServiceCreate = jest.spyOn(service, 'create');
      controller.createCategoryAction(mockCreateCategoryDto());
      expect(spyCategoryServiceCreate).toHaveBeenCalledWith(
        mockCreateCategoryDto(),
      );
    });
    it('category service ,create method should called once', () => {
      const spyCategoryServiceCreate = jest.spyOn(service, 'create');
      controller.createCategoryAction(mockCreateCategoryDto());
      expect(spyCategoryServiceCreate).toHaveBeenCalledTimes(1);
    });
  });

  describe('Find Category By Id Action', () => {
    it('find category by id should return anything that returned by category service find method', () => {
      jest
        .spyOn(service, 'find')
        .mockResolvedValueOnce(mockCreateCategoryResult() as any);

      expect(controller.findCategoryById('123')).resolves.toEqual(
        mockCreateCategoryResult(),
      );
    });
    it('find category by id should return not found exception', () => {
      jest
        .spyOn(service, 'find')
        .mockRejectedValueOnce(
          new NotFoundException('category is not found ...'),
        );

      expect(controller.findCategoryById('123')).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
    it('category service find should called once', () => {
      const spyCategoryServiceFind = jest.spyOn(service, 'find');
      controller.findCategoryById('123');
      expect(spyCategoryServiceFind).toBeCalledTimes(1);
    });
    it('category service should called by correct parameters', () => {
      const spyCategoryServiceFind = jest.spyOn(service, 'find');
      controller.findCategoryById('123');
      expect(spyCategoryServiceFind).toBeCalledWith({ _id: '123' }, true);
    });
  });

  describe('Find Categories Action', () => {
    it('should return anything returned by category service findAll method', () => {
      jest
        .spyOn(service, 'findAll')
        .mockResolvedValueOnce(mockCategories() as any);
      expect(controller.findCategoriesAction()).resolves.toEqual(
        mockCategories(),
      );
    });
    it('should call category service findAll Method one time', () => {
      const spyCategoryServiceFind = jest.spyOn(service, 'findAll');
      controller.findCategoriesAction();
      expect(spyCategoryServiceFind).toBeCalledTimes(1);
    });
  });
});
