import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateContactDto {
  @ApiProperty({ example: 'John Doe', description: 'Contact name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'john@example.com', description: 'Contact email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Contact phone',
    required: false,
  })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({
    example: 'I have a question about...',
    description: 'Contact message',
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}
