import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from '../users/user.entity';
import { LoginDto, RegisterDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    // Verificar si el email ya existe
    const existingUserByEmail = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingUserByEmail) {
      throw new ConflictException('El email ya está registrado');
    }

    // Verificar si el username ya existe
    const existingUserByUsername = await this.userRepository.findOne({
      where: { username: registerDto.username },
    });

    if (existingUserByUsername) {
      throw new ConflictException('El nombre de usuario ya está en uso');
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Crear el nuevo usuario
    const newUser = this.userRepository.create({
      ...registerDto,
      password: hashedPassword,
      role: UserRole.USER,
      status: 'active',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.userRepository.save(newUser);

    // Generar token JWT
    const payload = { sub: newUser.id, email: newUser.email, role: newUser.role };
    const access_token = await this.jwtService.signAsync(payload);

    // Retornar usuario sin la contraseña
    const { password, ...userWithoutPassword } = newUser;

    return {
      user: userWithoutPassword,
      access_token,
    };
  }

  async login(loginDto: LoginDto) {
    // Buscar usuario por email
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verificar si el usuario está activo
    if (!user.isActive) {
      throw new UnauthorizedException('Usuario inactivo');
    }

    // Generar token JWT
    const payload = { sub: user.id, email: user.email, role: user.role };
    const access_token = await this.jwtService.signAsync(payload);

    // Retornar usuario sin la contraseña
    const { password, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      access_token,
    };
  }

  async validateToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      const user = await this.userRepository.findOne({
        where: { id: payload.sub },
      });

      if (!user || !user.isActive) {
        throw new UnauthorizedException('Usuario no válido');
      }

      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
