import { Controller, FileTypeValidator, Get } from '@nestjs/common';
import { Fingerprint, FingerPrint, RealIp } from '@dilanjer/fingerprint';
@Controller()
export class AppController {
  @Get()
  getFingerprint(@Fingerprint() fp: FingerPrint): FingerPrint {
    return fp;
  }

  @Get('my-ip-address')
  getMyIpAddress(@RealIp() ipAddress: string): string {
    return ipAddress;
  }
}
