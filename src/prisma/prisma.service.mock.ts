export class PrismaMockService {
  cart = {
    upsert: jest.fn(),
    findUnique: jest.fn(),
  };

  cartItem = {
    upsert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    deleteMany: jest.fn(),
  };

  order = {
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    findMany: jest.fn(),
  };

  orderItem = {
    create: jest.fn(),
  };

  product = {
    findUnique: jest.fn(),
  };
}

export const prismaMock = new PrismaMockService();