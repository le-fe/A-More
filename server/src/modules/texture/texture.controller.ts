import { Controller, Get, Inject, Param, Post, Put, Req } from '@nestjs/common';
import { TextureService } from './texture.service';

@Controller('texture')
export class TextureController {
  constructor(
    @Inject('TEXTURE_SERVICE')
    private readonly service: TextureService,
  ) {}

  @Get('/')
  async list(queries) {
    return await this.service.list(queries);
  }

  @Get(':uid')
  async retrieve(@Param('uid') uid: string) {
    return await this.service.findOne(uid);
  }
}
