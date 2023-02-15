import {
  BadRequestException,
  Body,
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
import { Request } from 'express';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';
import { hasRoles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guard/JwtAuth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { ElementService } from './element.service';
import { ElementEntity } from './element.entity';

@UseInterceptors(TransformInterceptor)
@Controller('elements')
export class ElementController {
  constructor(
    @Inject('ELEMENTS_SERVICE')
    private readonly service: ElementService,
  ) {}

  @Get('/')
  async list(queries, @Req() req: Request) {
    const response = await this.service.list(queries);
    if (response.data) {
      response.data = response.data.map((item) => new ElementEntity(item, req));
    }
    return response;
  }

  @Get(':uid')
  async retrieve(@Param('uid') uid: string) {
    return await this.service.findOne(uid);
  }
}
