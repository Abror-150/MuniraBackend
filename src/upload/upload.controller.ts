import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as sharp from 'sharp';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('upload')
@ApiTags('Upload')
export class UploadController {
  @Post()
  @ApiOperation({ summary: 'Upload and compress a file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './dist/images',
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}${path.extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return { message: 'Fayl yuklanmadi' };
    }

    const compressedFilename = `compressed-${path.parse(file.filename).name}.jpg`;
    const compressedPath = `./dist/images/${compressedFilename}`;

    await sharp(file.path)
      .resize(1024)
      .jpeg({ quality: 70 })
      .toFile(compressedPath);

    return {
      original: `http://localhost:3000/images/${file.filename}`,
      compressed: `http://localhost:3000/images/${compressedFilename}`,
    };
  }
}
