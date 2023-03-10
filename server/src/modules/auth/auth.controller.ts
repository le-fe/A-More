import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Get,
  Post,
  Put,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { comparePassword } from '../../utils/bcrypt';
import { SignInDto } from './dto/SignIn.dto';
import { RegisterDto } from './dto/Register.dto';
import { JwtAuthGuard } from '../auth/guard/JwtAuth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  @UsePipes(ValidationPipe)
  async login(@Body() signInDto: SignInDto) {
    const username = signInDto.username;
    const user = await this.usersService.findOne({ username });

    if (!user) {
      throw new UnauthorizedException('invalid credentials');
    }

    if (!(await comparePassword(signInDto.password, user.password))) {
      throw new UnauthorizedException('invalid credentials');
    }

    const token = await this.jwtService.signAsync({
      id: user.id,
      username: user.username,
    });

    return {
      message: 'Login Success!',
      ok: true,
      status: HttpStatus.OK,
      token: token,
    };
  }

  @Post('register')
  @UsePipes(ValidationPipe)
  async register(@Body() registerDto: RegisterDto) {
    const { username } = registerDto;
    const user = await this.usersService.findOne({ username });

    if (user) {
      throw new UnauthorizedException('User existed');
    }

    const token = await this.usersService.createUser(registerDto);

    return {
      ok: true,
      message: 'Register successfully!',
      status: HttpStatus.CREATED,
      token: token,
    };
  }

  @Put('username-check')
  async checkUserAvailable(@Body() signInDto) {
    const username = signInDto.username;
    const existedUser = await this.usersService.findOne({ username });
    const isExisted = Boolean(existedUser);
    const mappingCode = {
      USER_EXISTED: 'USER_EXISTED_PLS_LOGIN',
      USER_NOT_EXISTED: 'USER_NOT_EXISTED_PLS_REGISTER',
    };
    const messageCode = isExisted
      ? mappingCode.USER_EXISTED
      : mappingCode.USER_NOT_EXISTED;
    return { ok: true, status: HttpStatus.OK, messageCode };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getUser(@Req() req: Request) {
    return {
      ok: true,
      status: HttpStatus.OK,
      data: req.user,
    };
  }
}
