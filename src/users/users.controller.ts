import { Body, Controller, Get, Post, Put, Delete, Param, UseGuards, BadRequestException, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { AdminGuard } from '../auth/admin.guard';

@ApiTags('users')
@ApiBearerAuth('JWT-auth')
@Controller('users')
@UseGuards(AuthGuard, AdminGuard) // Todas las rutas requieren autenticación y ser admin
export class UsersController {
    constructor(private readonly userService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios (Solo Admin)' })
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener usuario por ID (Solo Admin)' })
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
    return this.userService.getUserById(id);
  }
  
  @Post()
  @ApiOperation({ summary: 'Crear nuevo usuario (Solo Admin)' })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar usuario (Solo Admin)' })
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar usuario (Solo Admin)' })
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
