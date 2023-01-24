import { RedisModule } from '@liaoliaots/nestjs-redis';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as config from 'config';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { isProd } from './common/constant';
import { TypeORMExceptionFilter } from './common/filter/typeorm-exception.filter';
import { FileModule } from './file/file.module';
import { FoodModule } from './food/food.module';
import { LikeModule } from './like/like.module';
import { MenuModule } from './menu/menu.module';
import { RecipeModule } from './recipe/recipe.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { ReviewModule } from './review/review.module';
import { UserModule } from './user/user.module';
import { VeganTypeModule } from './vegan-type/vegan-type.module';
import { VisitModule } from './visit/visit.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: `${process.env.NODE_ENV}.env` }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: !isProd,
      playground: !isProd,
      autoSchemaFile: true,
      context: ({ req }) => ({ req }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: config.get('db.host'),
      port: config.get('db.port'),
      username: config.get('db.username'),
      password: config.get('db.password'),
      database: config.get('db.database'),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migration/*.{ts,js}'],
      migrationsRun: true,
      cli: { migrationsDir: 'src/migration' },
      logging: ['schema', 'warn', 'error', 'query'],
      logger: 'advanced-console',
      synchronize: false,
    }),
    RedisModule.forRoot({
      config: {
        host: config.get('redis.host'),
        port: config.get('redis.port'),
        keyPrefix: 'cache:',
      },
    }),
    AuthModule,
    UserModule,
    RestaurantModule,
    RecipeModule,
    LikeModule,
    VeganTypeModule,
    CategoryModule,
    MenuModule,
    FoodModule,
    ReviewModule,
    FileModule,
    VisitModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: TypeORMExceptionFilter,
    },
  ],
})
export class AppModule {}
