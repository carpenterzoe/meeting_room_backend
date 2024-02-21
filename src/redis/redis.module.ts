import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { createClient } from 'redis';
import { ConfigService } from '@nestjs/config';

// 用 @Global() 把它声明为全局模块，这样只需要在 AppModule 里引入
// 别的模块不用引入也可以注入 RedisService 了。
@Global()
@Module({
  providers: [
    RedisService,
    {
      provide: 'REDIS_CLIENT',
      async useFactory(configService: ConfigService) {
        console.log(
          'redis_server_host',
          configService.get('redis_server_host'),
        );
        console.log(
          'redis_server_port',
          configService.get('redis_server_port'),
        );

        const client = createClient({
          socket: {
            host: 'localhost',
            port: 6379,
          },
          database: 1,
        });
        await client.connect();
        return client;
      },
      inject: [ConfigService],
    },
  ],
  exports: [RedisService],
})
export class RedisModule {}
