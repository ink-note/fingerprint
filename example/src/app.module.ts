import { Module } from '@nestjs/common';
import { FingerprintModule } from '@dilanjer/fingerprint';
import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [
    FingerprintModule.forRoot({
      params: ['ipAddress', 'headers', 'userAgent'],
      cookieOptions: {
        httpOnly: true,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
