import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/posts.service';
import { PostsModule } from './posts/posts.module';
import { AppreciationsController } from './appreciations/appreciations.controller';
import { AppreciationsEntity } from './appreciations/appreciations.entity';
import { AppreciationsModule } from './appreciations/appreciations.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'liquivote',
      entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
      ],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    PostsModule,
    AppreciationsModule
  ],
  controllers: [AppController, PostsController, AppreciationsController],
  providers: [AppService, PostsService, AppreciationsEntity],
})
export class AppModule {}
