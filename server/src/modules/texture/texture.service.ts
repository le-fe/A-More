import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Texture } from '../../typeorm/Texture';
import { encodePassword } from '../../utils/bcrypt';
import { Repository } from 'typeorm';
import { paginateResponse } from '../../common/paginate';

@Injectable()
export class TextureService {
  constructor(
    @InjectRepository(Texture)
    private readonly repository: Repository<Texture>,
  ) {}
  async list(queries?: any) {
    const take = queries?.take || 10;
    const page = queries?.page || 1;
    const skip = (page - 1) * take;
    const res = await this.repository.findAndCount({
      select: {
        id: true,
        name: true,
        src: true,
        description: true,
        createAt: true,
      },
      order: { createAt: 'DESC' },
      take,
      skip,
    });
    return paginateResponse(res, page, take);
  }
  async findOne(id: string) {
    return await this.repository.findOne({ where: { id } });
  }
}
