import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { BoardElementService } from './board-elements.service';
import { CreateBoardElementDto } from './dto/CreateBoardElement.dto';
import { ElementEntity } from '../element/element.entity';

@Controller('board-elements')
export class BoardElementController {
  constructor(
    @Inject('BOARD_ELEMENT_SERVICE')
    private readonly service: BoardElementService,
  ) {}

  @Get(':boardId')
  async retrieve(@Param('boardId') boardId: string, @Req() req: Request) {
    let response = await this.service.list(boardId, {});
    for (const item of response) {
      item.element = new ElementEntity(item.element, req);
    }
    return response;
  }

  @Post('/')
  async create(@Body() body: CreateBoardElementDto, @Req() req: Request) {
    const item = await this.service.create(body);
    item.element = new ElementEntity(item.element, req);
    return item;
  }

  @Delete(':boardId')
  async delete(@Param('boardId') boardId: string, @Req() req: Request) {
    return await this.service.delete(boardId);;
  }
}
