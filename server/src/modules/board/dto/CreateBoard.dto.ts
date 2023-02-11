import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(16)
  texture: string;

  @IsNotEmpty()
  name: string;
}
