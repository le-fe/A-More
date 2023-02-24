import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardElementItem } from '../../typeorm/BoardElementItem';
import { Board } from '../../typeorm/Board';
import { Element } from '../../typeorm/Element';
import { Repository } from 'typeorm';
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
  async list(boardId: string, queries?: any) {
    const boardElements = await this.repository
      .createQueryBuilder('boardElementItem')
      .leftJoinAndSelect('boardElementItem.element', 'element')
      .where('boardElementItem.boardId = :boardId', { boardId })
      .getMany();
    return boardElements;
  }
  async findOne(id: string) {
    return await this.repository.findOne({ where: { id } });
  }

  async create(createData: CreateBoardElementDto) {
    const boardItem = new BoardElementItem();
    const board = await this.boardService.findOne({
      where: { id: createData.board },
    });
    boardItem.board = board;
    const element = await this.elementService.findOne({
      where: { id: createData.element },
    });
    boardItem.element = element;
    boardItem.title = createData.title || element.name;
    boardItem.content = createData.content || '';
    return this.repository.save(boardItem);
  }

  async delete(id: string) {
    return await this.repository
      .createQueryBuilder()
      .delete()
      .from(BoardElementItem)
      .where('id = :id', { id })
      .execute();
  }
}
