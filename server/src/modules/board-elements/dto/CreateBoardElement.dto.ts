import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsNumber,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateBoardElementDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(16)
  board: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(16)
  element: string;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsNumber()
  order: number;
}
