import { Module } from '@nestjs/common';
import { RestApiService } from './restapi.service';
import { JwtModule } from '@nestjs/jwt';
import { MongoDBModule } from './mongodb/mongodb.module';
import { MongooseModule } from '@nestjs/mongoose';
import { jwtConfig } from './utils/constants';
import { UserController } from './entities/user/user.controller';
import { UserService } from './entities/user/user.service';
import { JwtDashboardStrategy } from './auth/strategies/jwt-dashboard.strategy';
import { RestApiController } from './restapi.controller';
import { NotesController } from './entities/note/note.controller';
import { NotesService } from './entities/note/note.service';
import { JwtShareStrategy } from './auth/strategies/jwt-share.strategy';
import { Note, NoteSchema } from './mongodb/schemas/notes.schema';
import { User, UserSchema } from './mongodb/schemas/user.shema';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 300,
        },
      ],
    }),
    MongoDBModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Note.name, schema: NoteSchema },
    ]),
    JwtModule.register({
      global: true,
      secret: jwtConfig.secrets.global,
      signOptions: { expiresIn: '600s' },
    }),
  ],
  controllers: [RestApiController, UserController, NotesController],
  providers: [
    RestApiService,
    UserService,
    NotesService,
    JwtDashboardStrategy,
    JwtShareStrategy,
  ],
})
export class RestApiModule {}
