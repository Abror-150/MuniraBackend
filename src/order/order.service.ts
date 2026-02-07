import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TelegramService } from 'src/telegram/telegram.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly telegram: TelegramService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    // 🟢 1. Order yaratish
    const order = await this.prisma.order.create({
      data: {
        fullName: createOrderDto.fullName,
        phone: createOrderDto.phone,
        address: createOrderDto.address,
        email: createOrderDto.email,
        oferta: createOrderDto.oferta,
        totalPrice: createOrderDto.totalPrice,
        OrderItem: {
          create: createOrderDto.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
      include: { OrderItem: { include: { Product: true } } },
    });

    // 🟣 2. Telegramga xabar yuborish
    const orderText = `
🆕 <b>Yangi buyurtma!</b>
👤 Ism: ${order.fullName}
📞 Telefon: ${order.phone}
📍 Manzil: ${order.address}
💰 Narxi: ${order.totalPrice} so'm
🧾 Buyurtma ID: ${order.id}

🛍️ <b>Mahsulotlar:</b>
${order.OrderItem.map(
  (item) =>
    `• ${item.Product.name_uz} — ${item.quantity} dona — ${item.Product.price} so'm`,
).join('\n')}
`;

    await this.telegram.sendMessage(orderText);

    return {
      message: 'Buyurtma yaratildi va Telegramga yuborildi ✅',
      data: order,
    };
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: { OrderItem: { include: { Product: true } } },
    });
  }

  async findOne(id: string) {
    const check = await this.prisma.order.findFirst({ where: { id } });
    if (!check) {
      throw new NotFoundException('Topilmadi');
    }

    return check;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const check = await this.prisma.order.update({
      where: { id },
      data: updateOrderDto,
    });
    if (!check) {
      throw new NotFoundException('Topilmadi');
    }

    return check;
  }

  async remove(id: string) {
    const check = await this.prisma.order.delete({ where: { id } });
    if (!check) {
      throw new NotFoundException('Topilmadi');
    }

    return check;
  }
}
