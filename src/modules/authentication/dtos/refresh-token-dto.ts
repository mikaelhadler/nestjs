import { IsString } from 'class-validator'

export class RefreshTokenDto {
  @IsString({ always: true })
  refreshToken: string
}