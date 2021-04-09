import { Controller, Get, Param, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @Get(':lng?/tag/')
  test(@Param('lng') lng: string, @Req() req: any) {
    return {
      lng: lng || 'en',
      hello: req.t('home.header'),
    };
  }

  @Get(':lng?')
  getHello(): string {
    return this.appService.getHello();
  }
}
