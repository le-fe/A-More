import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Element } from '../../typeorm/Element';
import { Repository } from 'typeorm';
import { paginateResponse } from '../../common/paginate';

@Injectable()
export class ElementService {
  constructor(
    @InjectRepository(Element)
    private readonly repository: Repository<Element>,
  ) {}

  async list(queries?: any) {
    const take = queries?.take || 10;
    const page = queries?.page || 1;
    const skip = (page - 1) * take;
    const res = await this.repository.findAndCount({
      select: {
        id: true,
        name: true,
        description: true,
        src: true,
        createAt: true,
      },
      order: { createAt: 'DESC' },
      take,
      skip,
    });
    return paginateResponse(res, page, take);
  }

  async retrieve(id: string) {
    return await this.repository.findOne({ where: { id } });
  }

  async findOne(condition: any) {
    return await this.repository.findOne(condition);
  }
}
