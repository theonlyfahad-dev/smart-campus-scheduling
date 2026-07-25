import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userId: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUserId(userId);
    if (!user) {
      this.logger.warn(`Failed login attempt for unknown user: ${userId}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      this.logger.warn(`Login attempt for disabled account: ${userId}`);
      throw new ForbiddenException('Account is disabled');
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (isMatch) {
      const { password, ...result } = user;
      return result;
    }

    this.logger.warn(`Failed login attempt for user: ${userId}`);
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.userId, loginDto.password);

    if (user.isFirstLogin && !loginDto.isFirstLoginAttempt) {
      return {
        message: 'First login requires password change',
        requiresPasswordChange: true,
        userId: user.userId,
      };
    }

    const payload = {
      sub: user.id,
      userId: user.userId,
      role: user.role,
      departmentId: user.departmentId,
    };

    this.logger.log(`Successful login for user: ${user.userId}`);
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        userId: user.userId,
        role: user.role,
        departmentId: user.departmentId,
        isFirstLogin: user.isFirstLogin,
      },
    };
  }

  async changePassword(userId: string, dto: ChangePasswordDto) {
    const user = await this.usersService.findByUserId(userId);
    if (!user) throw new UnauthorizedException();

    const isMatch = await bcrypt.compare(dto.oldPassword, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid old password');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(dto.newPassword, salt);

    await this.usersService.updatePassword(user.id, hash);
    this.logger.log(`Password changed successfully for user: ${userId}`);

    return { message: 'Password updated successfully' };
  }

  async resetPassword(
    adminId: string,
    targetUserId: string,
    newTempPassword: string,
  ) {
    const admin = await this.usersService.findById(adminId);
    if (!admin || admin.role !== 'ADMIN') {
      throw new ForbiddenException('Only Administrators can reset passwords');
    }

    const targetUser = await this.usersService.findByUserId(targetUserId);
    if (!targetUser) {
      throw new UnauthorizedException('User not found');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newTempPassword, salt);

    await this.usersService.updatePassword(targetUser.id, hash);
    // Force first login flag again
    await this.usersService['prisma'].user.update({
      where: { id: targetUser.id },
      data: { isFirstLogin: true },
    });

    this.logger.log(
      `Admin ${admin.userId} reset password for user ${targetUserId}`,
    );
    return {
      message:
        'Password reset successfully. User must change it on next login.',
    };
  }
}
