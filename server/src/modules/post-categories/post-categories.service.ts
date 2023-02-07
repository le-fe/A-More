import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostCategory } from '../../typeorm/PostCategory';
import { encodePassword } from '../../utils/bcrypt';
import { Repository } from 'typeorm';
import { paginateResponse } from '../../common/paginate';

@Injectable()
export class PostCategoriesService {
  constructor(
    @InjectRepository(PostCategory)
    private readonly repository: Repository<PostCategory>,
  ) {}
  async list(queries?: any) {
    const take = queries?.take || 10;
    const page = queries?.page || 1;
    const skip = (page - 1) * take;
    const res = await this.repository.findAndCount({
      select: {
        uid: true,
        name: true,
        description: true,
        imgUrl: true,
        createAt: true,
      },
      order: { createAt: 'DESC' },
      take,
      skip,
    });
    return paginateResponse(res, page, take);
  }
}
