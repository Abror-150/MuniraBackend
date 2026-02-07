import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Bu prisma'ni barcha modullarda ishlatish uchun
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
