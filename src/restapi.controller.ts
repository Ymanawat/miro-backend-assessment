import { Controller, Get } from '@nestjs/common';
import { RestApiService } from './restapi.service';

@Controller()
export class RestApiController {
  constructor(private readonly appService: RestApiService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
