import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from '../../typeorm/Board';
import { NotFoundError } from '../../errors/not-found.error';
import { Repository } from 'typeorm';
import { paginateResponse } from '../../common/paginate';
import { CreateBoardDto, UpdateBoardDto } from './dto/CreateBoard.dto';
import { User } from '../../typeorm/User';
import { Texture } from '../../typeorm/Texture';
import { TextureService } from '../texture/texture.service';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly repository: Repository<Board>,
    @InjectRepository(Texture)
    private textureService: TextureService,
  ) {}
  async list(queries?: any) {
    const take = queries?.take || 10;
    const page = queries?.page || 1;
    const skip = (page - 1) * take;
    const res = await this.repository.findAndCount({
      order: { createAt: 'DESC' },
      take,
      skip,
    });
    return paginateResponse(res, page, take);
  }

  async findOne(id: string): Promise<Board> {
    const board = await this.repository.findOne({
      where: { id },
      relations: ['texture'],
    });
    if (!board) {
      throw new NotFoundError('board');
    }
    return board;
  }

  async create(user: User, createData: CreateBoardDto) {
    const board = new Board();
    board.user = user;
    board.name = createData.name || 'Untitle board';
    board.content = '';
    const texture = await this.textureService.findOne({
      where: { id: createData.texture },
    });
    board.texture = texture;
    return this.repository.save(board);
  }

  async update(uid: string, payload: UpdateBoardDto) {
    const board = await this.findOne(uid);
    board.name = payload.name;
    board.template = payload.template;
    return this.repository.save(board);
  }
}
