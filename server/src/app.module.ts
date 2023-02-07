import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfigAsync } from './config/typeorm.config';
import modules from './modules';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    ...modules,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
