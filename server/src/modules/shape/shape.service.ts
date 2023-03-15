import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shape } from '../../typeorm/Shape';
import { Repository } from 'typeorm';
import { paginateResponse } from '../../common/paginate';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class ShapeService {
  constructor(
    @InjectRepository(Shape)
    private readonly repository: Repository<Shape>,
  ) {}
  async list(queries?: any) {
    const take = queries?.take || 10;
    const page = queries?.page || 1;
    const queryBuilder = await this.repository
      .createQueryBuilder('shape')
      .orderBy('shape.createAt', 'DESC');
    return paginate<Shape>(queryBuilder, { limit: take, page: page });
  }
  async findOne(condition: any) {
    return await this.repository.findOne(condition);
  }
}
