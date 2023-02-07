import { IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  fullName: string;

  imgUrl: string;

  email: string;

  @IsNotEmpty()
  password: string;

  role: any;
}
