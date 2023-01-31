import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  Put,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { comparePassword } from '../utils/bcrypt';
import { SignInDto } from './dto/SignIn.dto';
import { RegisterDto } from './dto/Register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  @UsePipes(ValidationPipe)
  async login(@Body() signInDto: SignInDto) {
    const email = signInDto.email;
    const user = await this.usersService.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('invalid credentials');
    }

    if (!(await comparePassword(signInDto.password, user.password))) {
      throw new UnauthorizedException('invalid credentials');
    }

    const token = await this.jwtService.signAsync({
      id: user.id,
      email: user.email,
    });

    return {
      massage: 'Login Success!',
      status: HttpStatus.CREATED,
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
      message: 'Login Success!',
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
    return { status: HttpStatus.OK, messageCode };
  }
}
