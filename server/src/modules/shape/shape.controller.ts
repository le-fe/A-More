import {
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ShapeService } from './shape.service';

@Controller('Shape')
export class ShapeController {
  constructor(
    @Inject('SHAPE_SERVICE')
    private readonly service: ShapeService,
  ) {}

  @Get('/')
  async list(@Query() queries) {
    return await this.service.list(queries);
  }

  @Get(':uid')
  async retrieve(@Param('uid') uid: string) {
    return await this.service.findOne(uid);
  }
}
