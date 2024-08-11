import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DocsService } from './docs/docs.service';
import { DocsController } from './docs/docs.controller';
import { DocsModule } from './docs/docs.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost/nest'),
    DocsModule,
  ],
  controllers: [AppController, DocsController],
  providers: [AppService, DocsService],
})
export class AppModule {}
