import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from 'generated/prisma/client'; // ✅ Prisma.Decimal ishlatamiz

export class CreateProductDto {
  @ApiProperty({
    example: 'Mahsulot nomi',
    description: 'Product name in Uzbek',
  })
  @IsString()
  @IsNotEmpty()
  name_uz: string;

  @ApiProperty({
    example: 'Product name',
    description: 'Product name in English',
  })
  @IsString()
  @IsNotEmpty()
  name_en: string;

  @ApiProperty({
    example: 'Название продукта',
    description: 'Product name in Russian',
  })
  @IsString()
  @IsNotEmpty()
  name_ru: string;

  @ApiProperty({
    example: 'Mahsulot tavsifi',
    description: 'Product description in Uzbek',
  })
  @IsString()
  @IsNotEmpty()
  description_uz: string;

  @ApiProperty({
    example: 'Описание продукта',
    description: 'Product description in Russian',
  })
  @IsString()
  @IsNotEmpty()
  description_ru: string;

  @ApiProperty({
    example: 'Product description',
    description: 'Product description in English',
  })
  @IsString()
  @IsNotEmpty()
  description_en: string;

  @ApiProperty({ example: '99.99', description: 'Product price' })
  @IsNotEmpty()
  price: Prisma.Decimal;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'Product image URL',
  })
  @IsString()
  @IsNotEmpty()
  image: string;

  
}
