import { IsMongoIDPipe } from './is-mongoId.pipe';
import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

describe('IsMongoID Pipe Test', () => {
  let pipe: IsMongoIDPipe;

  beforeEach(() => {
    pipe = new IsMongoIDPipe();
  });

  it('should throw error when pass invalid mongoId', () => {
    expect(() => pipe.transform('123')).toThrowError(BadRequestException);
  });

  it('should not be throw error when pass correct mongoid', () => {
    const mongoId = new Types.ObjectId().toString();
    expect(pipe.transform(mongoId)).toEqual(mongoId);
  });
});
