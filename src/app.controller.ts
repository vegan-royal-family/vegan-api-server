import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Controller, Get } from '@nestjs/common';
import Redis from 'ioredis';

@Controller()
export class AppController {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  @Get('/health')
  health(): string {
    return 'health ok';
  }

  @Get('/get')
  async test(): Promise<string> {
    const test = await this.redis.get('test');
    if (test) {
      return 'ok ' + test;
    }
    return 'no' + test;
  }

  @Get('/set')
  async set() {
    await this.redis.set('test', 'hello');
    return true;
  }
}
