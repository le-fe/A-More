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
import { Request } from 'express';
import { hasRoles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guard/JwtAuth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { PostCategoriesService } from './post-categories.service';

@Controller('post-categories')
export class PostCategoriesController {
  constructor(
    @Inject('POST_CATEGORIES_SERVICE')
    private readonly service: PostCategoriesService,
  ) {}

  @Get('/')
  async getTopAuthors(queries) {
    return await this.service.list(queries);
  }
}
