import { IsObject, IsString } from 'class-validator'

export class TokenDto {
  @IsString({ always: true })
  email: string
}

export class CreateTokenDto {
  @IsString({ always: true })
  accessToken: string

  @IsString({ always: true })
  refreshToken: string
}

export class ProfileUser {
  @IsString({ always: true })
  email: string

  @IsString({ always: true })
  displayName: string

  @IsString({ always: true })
  picture: string

  @IsString({ always: true })
  fullName: string
}

export class TokenUser {
  @IsString({ always: true })
  id_token: string
}

export class TokenResponseDto {
  @IsObject()
  profile: ProfileUser

  @IsObject()
  token: TokenUser
}

export class UserResponseDto {
  @IsObject()
  user: TokenResponseDto
}
