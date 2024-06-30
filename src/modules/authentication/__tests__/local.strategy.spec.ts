import { Test, TestingModule } from "@nestjs/testing";
import { AuthenticationService } from "@/modules/authentication/authentication.service";
import { LocalStrategy } from "@/modules/authentication/local.strategy";
import { UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

describe('LocalStrategy', () => {
  let strategy: LocalStrategy;
  let authService: AuthenticationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalStrategy,
        AuthenticationService,
        JwtService
      ],
    }).compile();

    strategy = module.get<LocalStrategy>(LocalStrategy);
    authService = module.get<AuthenticationService>(AuthenticationService);
  });

  it('should validate user and return the user object', async () => {
    const username = 'testuser';
    const password = 'testpassword';
    const expectedUser = { id: 1, username: 'testuser' };

    jest.spyOn(authService, 'validateUser').mockResolvedValue(expectedUser);

    const result = await strategy.validate(username, password);

    expect(authService.validateUser).toHaveBeenCalledWith(username, password);
    expect(result).toEqual(expectedUser);
  });

  it('should throw UnauthorizedException if user is not valid', async () => {
    const username = 'testuser';
    const password = 'testpassword';

    jest.spyOn(authService, 'validateUser').mockResolvedValue(null);

    await expect(strategy.validate(username, password)).rejects.toThrow(UnauthorizedException);
    expect(authService.validateUser).toHaveBeenCalledWith(username, password);
  });
});