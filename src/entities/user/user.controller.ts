import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Res,
} from '@nestjs/common';
import {
  NewUserDto,
  LoginPayload,
  LoginResponseDto,
  SuccessResponseDto,
} from './user.dto';
import { UserService } from './user.service';
import { ThrottlerGuard } from '@nestjs/throttler';

@UseGuards(ThrottlerGuard)
@Controller('api/auth')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('signup')
  async create(
    @Request() req: any,
    @Body() payload: NewUserDto,
  ): Promise<SuccessResponseDto> {
    return this.usersService.signUp(payload);
  }

  @Post('login')
  async userlogin(
    @Body() payload: LoginPayload,
    @Res({ passthrough: true }) res: any,
  ): Promise<LoginResponseDto> {
    const loginResponse = await this.usersService.login(payload);
    const access_token = loginResponse.bearer_token;

    res.cookie('access_token', access_token, {
      expires: new Date(Date.now() + 24 * 30 * 3600000),
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    return loginResponse;
  }
}
