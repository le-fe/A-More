import {
  IsBoolean,
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

export class UpdateBoardDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  template: string;

  @IsNotEmpty()
  widgets: string;

  elements: any[];

  texture?: any;

  @IsBoolean()
  isPublished?: boolean;
}
