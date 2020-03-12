import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/posts.service';
import { PostsModule } from './posts/posts.module';
import { VotesController } from './votes/votes.controller';
import { VotesEntity } from './votes/votes.entity';
import { VotesModule } from './votes/votes.module';

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
    VotesModule
  ],
  controllers: [AppController, PostsController, VotesController],
  providers: [AppService, PostsService, VotesEntity],
})
export class AppModule {}
