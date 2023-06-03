export const mockCreateCategoryDto = () => ({
  name: 'something ...',
});

export const mockCreateCategoryResult = () => ({
  name: 'something',
  id: 'object id ...',
});

export const mockCategories = () => [
  mockCreateCategoryResult(),
  mockCreateCategoryResult(),
];
