import { Injectable, UnauthorizedException } from '@nestjs/common'
import messages from '@/common/messages'
import env from '@/config/env'
import { JwtService } from '@nestjs/jwt'
import { RefreshTokenDto } from '@/modules/authentication/dtos/refresh-token-dto'
import { TokenDto, CreateTokenDto } from '@/modules/authentication/dtos/token-dto'
import { SchedulerRegistry } from '@nestjs/schedule'

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly schedulerRegistry: SchedulerRegistry
  ) { }

  async refreshToken(request: RefreshTokenDto): Promise<CreateTokenDto> {
    try {
      const { email } = await this.refreshTokenIsValid(request.refreshToken)
      return this.createToken({ email: email })
    } catch (error) {
      throw new UnauthorizedException(messages.authenticate.invalidToken)
    }
  }

  async refreshTokenIsValid(refreshToken: string) {
    return this.jwtService.verifyAsync(refreshToken)
  }

  async createToken(payload: TokenDto): Promise<CreateTokenDto> {
    const job = this.schedulerRegistry.getCronJob('Notification - every 10 seconds')
    job.stop();
    
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: `${process.env.ACCESS_TOKEN_EXPIRES_IN}`,
    })
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: `${process.env.REFRESH_TOKEN_EXPIRES_IN}`,
    })
    return {
      accessToken,
      refreshToken,
    }
  }

  async validateUser(username: string, pass: string): Promise<any> {
    // const user = await this.usersService.findOne(username);
    // if (user && user.password === pass) {
    //   const { password, ...result } = user;
    //   return result;
    // }
    if (username && pass ) {
      return {
        user: {
          profile: {
            email: 'mk@mk.com',
          },
          token: {
            id_token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF90b2tlbiI6ImV5SmhiR2NpT2lKU1V6STFOaUlzSW10cFpDSTZJbVJsWkdNd01USmtNRGRtTlRKaFpXUm1aRFZtT1RjM09EUmxNV0pqWW1VeU0yTXhPVGN5TkdRaUxDSjBlWEFpT2lKS1YxUWlmUS5leUpwYzNNaU9pSm9kSFJ3Y3pvdkwyRmpZMjkxYm5SekxtZHZiMmRzWlM1amIyMGlMQ0poZW5BaU9pSTROVE16TmpnME16Y3hOalF0TTJwdmJuVm5NelpuYmpRMlptdGtiR0ZvWXpOdVl6QjJhakp4T0hGbFpUWXVZWEJ3Y3k1bmIyOW5iR1YxYzJWeVkyOXVkR1Z1ZEM1amIyMGlMQ0poZFdRaU9pSTROVE16TmpnME16Y3hOalF0TTJwdmJuVm5NelpuYmpRMlptdGtiR0ZvWXpOdVl6QjJhakp4T0hGbFpUWXVZWEJ3Y3k1bmIyOW5iR1YxYzJWeVkyOXVkR1Z1ZEM1amIyMGlMQ0p6ZFdJaU9pSXhNRGcwT0RZNU1EY3hNRGt5TWprM01UVXlPRFlpTENKb1pDSTZJbTFsZFhCaFp5NWpiMjB1WW5JaUxDSmxiV0ZwYkNJNkltZHNiMkpoYkhONWN5NXRhV3RoWld4QWJXVjFjR0ZuTG1OdmJTNWljaUlzSW1WdFlXbHNYM1psY21sbWFXVmtJanAwY25WbExDSmhkRjlvWVhOb0lqb2ljVE5KZEhGUlNuUlVXSEpIUkVsQ2FISmhVa2xxZHlJc0ltNWhiV1VpT2lKSGJHOWlZV3h6ZVhNZ1RXbHJZV1ZzSUVoaFpHeGxjaUlzSW5CcFkzUjFjbVVpT2lKb2RIUndjem92TDJ4b015NW5iMjluYkdWMWMyVnlZMjl1ZEdWdWRDNWpiMjB2WVMwdlFVOW9NVFJIYVMxUWJVbFRlRU5VZW1kRVVXTnZNamRoZEhsdGNUQlhZWGh2ZEVsdVJYUjJiQzB6TFZjOWN6azJMV01pTENKbmFYWmxibDl1WVcxbElqb2lSMnh2WW1Gc2MzbHpJRTFwYTJGbGJDSXNJbVpoYldsc2VWOXVZVzFsSWpvaVNHRmtiR1Z5SWl3aWJHOWpZV3hsSWpvaVpXNGlMQ0pwWVhRaU9qRTJNRFUzT1RBeU5ETXNJbVY0Y0NJNk1UWXdOVGM1TXpnME0zMC5vcXZVeUl5ZlVsb1ZJTXM3MnZIX05vVjJFcHNlYzViZWl4OG1vMV92c3I3cW0xYzFZOXI1RHNVaFFUZnIza0FsU2o0bTRmSk5FWG4yRWlaVnJBSnlaVzlrV0RWa25aSmFhRjVwRFBLYi1OQzlQUXRDQmVrRXhHRTJTaGRtMzlrVmUtajg0c0dVSnlXWFVBbF8tYTVEOUw4RGFlV2VDX0p5ZWVRWDZmakJhSzJ5OWNzWmhNU09RZnRrd05vM2w4eXMzN2Zqc3JqY3UwVG1CcTRxZHNDLUY4cFROTEJrNGNPWXdndXhCdmQtUFF4OTNSRllnQWJMZTQ5QV94cWF2U0pUbjA4MWE2akppV0RSVEhCNV8xamk3RTJzeElUWmVRcUNIYmFEZGM3R0FtTk5VUkUwRkRldDRFUTctUE1hUFJXUWhuUzZ1ZUhWRDYzRlRJUy1EWG1yRmciLCJpYXQiOjE2MDU3ODk5ODYsImV4cCI6MTYwNTc5MzU4Nn0.GrkR-o343ScA280eNqSLN7VbD-g_fBLG0Fii11DwWkY',
          },
        },
      }
    }
    return null;
  }


}
