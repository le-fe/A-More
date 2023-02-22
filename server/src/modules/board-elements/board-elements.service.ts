import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardElementItem } from '../../typeorm/BoardElementItem';
import { Board } from '../../typeorm/Board';
import { Element } from '../../typeorm/Element';
import { Repository } from 'typeorm';
import { paginateResponse } from '../../common/paginate';
import { CreateBoardElementDto } from './dto/CreateBoardElement.dto';
import { BoardService } from '../board/board.service';
import { ElementService } from '../element/element.service';

@Injectable()
export class BoardElementService {
  constructor(
    @InjectRepository(BoardElementItem)
    private readonly repository: Repository<BoardElementItem>,
    @InjectRepository(Board)
    private boardService: BoardService,
    @InjectRepository(Element)
    private elementService: ElementService,
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
  async findOne(id: string) {
    return await this.repository.findOne({ where: { id } });
  }

  async create(createData: CreateBoardElementDto) {
    const boardItem = new BoardElementItem();
    boardItem.order = createData.order;
    const board = await this.boardService.findOne(createData.board);
    boardItem.board = board;
    const element = await this.elementService.findOne(createData.element);
    boardItem.element = element;
    boardItem.title = createData.title || element.name;
    boardItem.content = createData.content;
    return this.repository.save(boardItem);
  }
}
