import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import {
  mockCreateCategoryDto,
  mockCreateCategoryResult,
} from './category.stub';

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
});
