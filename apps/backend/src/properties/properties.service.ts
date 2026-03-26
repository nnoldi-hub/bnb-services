import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePropertyDto, UpdatePropertyDto } from './dto/property.dto';
import { PaginationDto, PaginatedResult } from '../common/dto/pagination.dto';
import { Role } from '@prisma/client';

@Injectable()
export class PropertiesService {
  constructor(private prisma: PrismaService) {}

  async create(ownerId: string, dto: CreatePropertyDto) {
    const property = await this.prisma.property.create({
      data: {
        name: dto.name,
        address: dto.address,
        description: dto.description,
        city: dto.city,
        country: dto.country || 'Romania',
        postalCode: dto.postalCode,
        latitude: dto.latitude,
        longitude: dto.longitude,
        bedrooms: dto.bedrooms,
        bathrooms: dto.bathrooms,
        photos: dto.photos || [],
        ownerId,
      },
      include: {
        owner: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return property;
  }

  async findAll(
    userId: string,
    userRole: Role,
    pagination: PaginationDto,
  ): Promise<PaginatedResult<any>> {
    const { skip, limit, page } = pagination;

    const where =
      userRole === Role.OWNER ? { ownerId: userId } : {};

    const [properties, total] = await Promise.all([
      this.prisma.property.findMany({
        where,
        skip,
        take: limit,
        include: {
          owner: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
            },
          },
          _count: {
            select: {
              tasks: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.property.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: properties,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  }

  async findOne(id: string, userId: string, userRole: Role) {
    const property = await this.prisma.property.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        tasks: {
          take: 5,
          orderBy: { createdAt: 'desc' },
          include: {
            assignedTo: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        _count: {
          select: {
            tasks: true,
          },
        },
      },
    });

    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }

    // Check ownership for OWNER role
    if (userRole === Role.OWNER && property.ownerId !== userId) {
      throw new ForbiddenException('You can only access your own properties');
    }

    return property;
  }

  async update(
    id: string,
    dto: UpdatePropertyDto,
    userId: string,
    userRole: Role,
  ) {
    const property = await this.prisma.property.findUnique({
      where: { id },
    });

    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }

    // Check ownership for OWNER role
    if (userRole === Role.OWNER && property.ownerId !== userId) {
      throw new ForbiddenException('You can only update your own properties');
    }

    const updatedProperty = await this.prisma.property.update({
      where: { id },
      data: dto,
      include: {
        owner: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return updatedProperty;
  }

  async remove(id: string, userId: string, userRole: Role) {
    const property = await this.prisma.property.findUnique({
      where: { id },
    });

    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }

    // Check ownership for OWNER role
    if (userRole === Role.OWNER && property.ownerId !== userId) {
      throw new ForbiddenException('You can only delete your own properties');
    }

    await this.prisma.property.delete({
      where: { id },
    });

    return { message: 'Property deleted successfully' };
  }
}
