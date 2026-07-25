import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { GetUser } from './decorators/get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  changePassword(@GetUser() user: any, @Body() dto: ChangePasswordDto) {
    return this.authService.changePassword(user.userId, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  resetPassword(
    @GetUser() admin: any,
    @Body() body: { targetUserId: string; newTempPassword: string },
  ) {
    return this.authService.resetPassword(
      admin.id,
      body.targetUserId,
      body.newTempPassword,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout() {
    // In a stateless JWT system, logout is typically handled client-side by dropping the token.
    // For enhanced security, a Redis token blacklist could be implemented here.
    return { message: 'Successfully logged out' };
  }
}
