import { JwtService } from "@nestjs/jwt";
import { AuthenticationService } from "@/modules/authentication/authentication.service";
import { Test, TestingModule } from "@nestjs/testing";
import { RefreshTokenDto } from "@/modules/authentication/dtos/refresh-token-dto";
import { CreateTokenDto } from "@/modules/authentication/dtos/token-dto";
import { UnauthorizedException } from "@nestjs/common";

describe('AuthenticationService', () => {
  let authenticationService: AuthenticationService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthenticationService, JwtService],
    }).compile();

    authenticationService = module.get<AuthenticationService>(AuthenticationService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('refreshToken', () => {
    it('should return a new token when the refresh token is valid', async () => {
      const refreshTokenDto: RefreshTokenDto = {
        refreshToken: 'valid_refresh_token',
      };

      const expectedTokenDto: CreateTokenDto = {
        accessToken: 'new_access_token',
        refreshToken: 'new_refresh_token',
      };

      jest.spyOn(authenticationService, 'refreshTokenIsValid').mockResolvedValue({ email: 'test@example.com' });
      jest.spyOn(authenticationService, 'createToken').mockResolvedValue(expectedTokenDto);

      const result = await authenticationService.refreshToken(refreshTokenDto);

      expect(authenticationService.refreshTokenIsValid).toHaveBeenCalledWith(refreshTokenDto.refreshToken);
      expect(authenticationService.createToken).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(result).toEqual(expectedTokenDto);
    });

    it('should throw an UnauthorizedException when the refresh token is invalid', async () => {
      const refreshTokenDto: RefreshTokenDto = {
        refreshToken: 'invalid_refresh_token',
      };

      jest.spyOn(authenticationService, 'refreshTokenIsValid').mockRejectedValue(new Error('Invalid token'));

      await expect(authenticationService.refreshToken(refreshTokenDto)).rejects.toThrow(UnauthorizedException);
      expect(authenticationService.refreshTokenIsValid).toHaveBeenCalledWith(refreshTokenDto.refreshToken);
    });
  });
});