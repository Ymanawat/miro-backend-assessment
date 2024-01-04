import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { IsValidPassword } from 'src/utils/decorators/password-validator.decorator';

export class UserDto {
  firstName: string;
  lastName: string;
  email: string;
}

export class NewUserDto {
  @IsNotEmpty()
  @MaxLength(50)
  firstName: string;

  @IsNotEmpty()
  @MaxLength(50)
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  email: string;

  @IsNotEmpty()
  @IsValidPassword()
  password: string;
}

export class LoginPayload {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  email: string;

  @IsNotEmpty()
  @IsValidPassword()
  password: string;
}

export class SuccessResponseDto {
  success: boolean;
  message?: string;
}

export class LoginResponseDto extends SuccessResponseDto {
  success: boolean;
  message: string;
  bearer_token: string;
}
