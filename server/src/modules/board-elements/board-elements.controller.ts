import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
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
import { BoardElementService } from './board-elements.service';
import { CreateBoardElementDto } from './dto/CreateBoardElement.dto';

@Controller('board-elements')
export class BoardElementController {
  constructor(
    @Inject('BOARD_ELEMENT_SERVICE')
    private readonly service: BoardElementService,
  ) {}

  @Get('/')
  async list(queries) {
    return await this.service.list(queries);
  }

  @Get(':uid')
  async retrieve(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Post('/')
  async create(@Body() body: CreateBoardElementDto) {
    return await this.service.create(body);
  }
}
