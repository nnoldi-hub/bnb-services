import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role } from '@prisma/client';
import { PaginationDto } from '../common/dto/pagination.dto';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(Role.ADMIN, Role.OWNER)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.OWNER)
  findAll(
    @Query() pagination: PaginationDto,
    @Query('role') role?: Role,
    @Query('isActive') isActive?: string,
  ) {
    const filters = {
      role,
      isActive: isActive ? isActive === 'true' : undefined,
    };
    return this.usersService.findAll(pagination, filters);
  }

  @Get('team')
  @Roles(Role.ADMIN, Role.OWNER)
  getTeamMembers(@CurrentUser('id') userId: string) {
    return this.usersService.getTeamMembers(userId);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.OWNER)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.OWNER)
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser('id') requestingUserId: string,
  ) {
    return this.usersService.update(id, updateUserDto, requestingUserId);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string, @CurrentUser('id') requestingUserId: string) {
    return this.usersService.remove(id, requestingUserId);
  }
}
