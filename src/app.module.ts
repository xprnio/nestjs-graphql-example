import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/users/user.module';
import { TeamModule } from './modules/teams/team.module';
import { GraphQLModule } from '@nestjs/graphql';
import { Team } from './modules/teams/team.model';
import { User } from './modules/users/user.model';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'island',
      entities: [ Team, User ],
      synchronize: true,
    }),
    GraphQLModule.forRoot({ autoSchemaFile: true }),

    UserModule,
    TeamModule,
  ],
  controllers: [ AppController ],
  providers: [ AppService ],
})
export class AppModule {
}
