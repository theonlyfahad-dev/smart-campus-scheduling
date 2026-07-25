import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: Partial<UsersService>;
  let jwtService: Partial<JwtService>;

  beforeEach(async () => {
    usersService = {
      findByUserId: jest.fn(),
      updatePassword: jest.fn(),
    };
    jwtService = {
      sign: jest.fn().mockReturnValue('mock_jwt_token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should throw UnauthorizedException if user not found', async () => {
    (usersService.findByUserId as jest.Mock).mockResolvedValue(null);
    await expect(authService.validateUser('admin', 'password')).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should validate user with correct password', async () => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('correct_password', salt);
    const mockUser = {
      id: '1',
      userId: 'admin',
      password: hash,
      isActive: true,
    };

    (usersService.findByUserId as jest.Mock).mockResolvedValue(mockUser);

    const result = await authService.validateUser('admin', 'correct_password');
    expect(result.userId).toBe('admin');
  });
});
