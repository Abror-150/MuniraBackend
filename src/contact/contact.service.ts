import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Contact } from 'generated/prisma/client';

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createContactDto: CreateContactDto): Promise<Contact> {
    return this.prisma.contact.create({
      data: createContactDto,
    });
  }

  async findAll(): Promise<Contact[]> {
    return this.prisma.contact.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string): Promise<Contact> {
    const contact = await this.prisma.contact.findUnique({
      where: { id },
    });

    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }

    return contact;
  }

  async update(
    id: string,
    updateContactDto: UpdateContactDto,
  ): Promise<Contact> {
    // Check if contact exists
    await this.findOne(id);

    return this.prisma.contact.update({
      where: { id },
      data: updateContactDto,
    });
  }

  async remove(id: string): Promise<Contact> {
    // Check if contact exists
    await this.findOne(id);

    return this.prisma.contact.delete({
      where: { id },
    });
  }
}
