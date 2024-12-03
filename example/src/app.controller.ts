import { Controller, Get } from '@nestjs/common';
import { Fingerprint, RealIp } from '@dilanjer/fingerprint';
@Controller()
export class AppController {
  @Get()
  getFingerprint(@Fingerprint() fp: Fingerprint): Fingerprint {
    return fp;
  }

  @Get('my-ip-address')
  getMyIpAddress(@RealIp() ipAddress: string): string {
    return ipAddress;
  }
}
