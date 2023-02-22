import {
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Patch,
  Req,
  UseGuards,
  Body,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { ReqUser } from '../auth/decorators/user.decorator';
import { BoardService } from './board.service';
import { JwtAuthGuard } from '../auth/guard/JwtAuth.guard';
import { User } from '../../typeorm/User';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';
import { CreateBoardDto, UpdateBoardDto } from './dto/CreateBoard.dto';
import { ElementEntity } from '../element/element.entity';

@UseInterceptors(TransformInterceptor)
@Controller('board')
export class BoardController {
  constructor(
    @Inject('BOARD_SERVICE')
    private readonly service: BoardService,
  ) {}

  @Get('/')
  async list(queries) {
    return await this.service.list(queries);
  }

  @Get(':uid')
  async retrieve(@Param('uid') uid: string, @Req() req: Request) {
    const detail = await this.service.findOne(uid);
    return detail;
  }

  @Post('/')
  @UseGuards(JwtAuthGuard)
  async create(@ReqUser() user: User, @Body() body: CreateBoardDto) {
    return await this.service.create(user, body);
  }

  @Patch(':uid')
  async update(@Param('uid') uid: string, @Body() body: UpdateBoardDto) {
    return await this.service.update(uid, body);
  }
}
