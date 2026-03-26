import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { PaginationDto, PaginatedResult } from '../common/dto/pagination.dto';
import { Role, TaskStatus } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, userRole: Role, dto: CreateTaskDto) {
    // Verify property exists and user has access
    const property = await this.prisma.property.findUnique({
      where: { id: dto.propertyId },
    });

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    if (userRole === Role.OWNER && property.ownerId !== userId) {
      throw new ForbiddenException('You can only create tasks for your properties');
    }

    // Verify assigned user exists if provided
    if (dto.assignedToId) {
      const assignedUser = await this.prisma.user.findUnique({
        where: { id: dto.assignedToId },
      });

      if (!assignedUser || !assignedUser.isActive) {
        throw new BadRequestException('Assigned user not found or inactive');
      }
    }

    const task = await this.prisma.task.create({
      data: {
        propertyId: dto.propertyId,
        title: dto.title,
        description: dto.description,
        type: dto.type,
        status: TaskStatus.PENDING,
        priority: dto.priority,
        assignedToId: dto.assignedToId,
        scheduledAt: dto.dueDate ? new Date(dto.dueDate) : null,
        checkpoints: dto.checkpoints
          ? {
              create: dto.checkpoints.map((description, index) => ({
                description,
                order: index + 1,
                isCompleted: false,
              })),
            }
          : undefined,
      },
      include: {
        property: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
        assignedTo: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        checkpoints: {
          orderBy: { order: 'asc' },
        },
      },
    });

    return task;
  }

  async findAll(
    userId: string,
    userRole: Role,
    pagination: PaginationDto,
    filters?: {
      status?: TaskStatus;
      propertyId?: string;
      assignedToId?: string;
    },
  ): Promise<PaginatedResult<any>> {
    const { skip, limit, page } = pagination;

    let where: any = { ...filters };

    // Apply role-based filtering
    if (userRole === Role.OWNER) {
      where.property = { ownerId: userId };
    } else if (userRole === Role.TEAM_MEMBER) {
      where.assignedToId = userId;
    }

    const [tasks, total] = await Promise.all([
      this.prisma.task.findMany({
        where,
        skip,
        take: limit,
        include: {
          property: {
            select: {
              id: true,
              name: true,
              address: true,
            },
          },
          assignedTo: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
          _count: {
            select: {
              photos: true,
              checkpoints: true,
            },
          },
        },
        orderBy: [{ priority: 'desc' }, { createdAt: 'desc' }],
      }),
      this.prisma.task.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: tasks,
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
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        property: {
          include: {
            owner: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
        assignedTo: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phoneNumber: true,
          },
        },
        photos: {
          orderBy: { createdAt: 'asc' },
        },
        checkpoints: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    // Check access permissions
    if (userRole === Role.OWNER && task.property.ownerId !== userId) {
      throw new ForbiddenException('You can only access tasks for your properties');
    }

    if (userRole === Role.TEAM_MEMBER && task.assignedToId !== userId) {
      throw new ForbiddenException('You can only access tasks assigned to you');
    }

    return task;
  }

  async update(id: string, dto: UpdateTaskDto, userId: string, userRole: Role) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: { property: { include: { owner: true } } },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    // Check permissions
    if (userRole === Role.OWNER && task.property.ownerId !== userId) {
      throw new ForbiddenException('You can only update tasks for your properties');
    }

    if (userRole === Role.TEAM_MEMBER && task.assignedToId !== userId) {
      throw new ForbiddenException('You can only update tasks assigned to you');
    }

    // If completing task, set completedAt
    const updateData: any = { ...dto };
    if (dto.status === TaskStatus.COMPLETED && !task.completedAt) {
      updateData.completedAt = new Date();
    }

    const updatedTask = await this.prisma.task.update({
      where: { id },
      data: updateData,
      include: {
        property: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
        assignedTo: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        checkpoints: {
          orderBy: { order: 'asc' },
        },
      },
    });

    return updatedTask;
  }

  async remove(id: string, userId: string, userRole: Role) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: { property: { include: { owner: true } } },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    // Only OWNER and ADMIN can delete tasks
    if (userRole === Role.OWNER && task.property.ownerId !== userId) {
      throw new ForbiddenException('You can only delete tasks for your properties');
    }

    if (userRole === Role.TEAM_MEMBER) {
      throw new ForbiddenException('Team members cannot delete tasks');
    }

    await this.prisma.task.delete({
      where: { id },
    });

    return { message: 'Task deleted successfully' };
  }
}
