import { Controller, UseInterceptors, Res, Post, Body } from '@nestjs/common'
import { AuthenticationService } from '@/modules/authentication/authentication.service'
import { LoggingInterceptor } from '@/interceptors/logging.interceptor'
import { CustomLoggerService } from '@/modules/logger/logger.service'
import { TokenDto } from '@/modules/authentication/dtos/token-dto'
import { RefreshTokenDto } from '@/modules/authentication/dtos/refresh-token-dto'

@UseInterceptors(LoggingInterceptor)
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService, private readonly loggerService: CustomLoggerService) {
    this.loggerService.setContext(AuthenticationController.name);
  }

  @Post('refresh')
  refresh(@Body() body: RefreshTokenDto) {
    return this.authService.refreshToken(body)
  }

  @Post('token')
  async saveToken(@Body() body: TokenDto, @Res() res) {
    const result = await this.authService.createToken(body)
    res.send(result)
    res.end()
  }
}
