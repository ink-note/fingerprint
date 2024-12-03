**Server-side fingerprinting library for framework NestJs**

## Features

- Generate fingerprint for each browser or device
- Function decorator support
- Auto set cookie

## Installation

```
npm install --save @dilanjer/fingerprint

or

yarn add @dilanjer/fingerprint
```

## Usage

app.module.ts

```typescript
import { Module } from "@nestjs/common";
import { FingerprintModule } from "@dilanjer/fingerprint";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    FingerprintModule.forRoot({
      params: ["headers", "userAgent", "ipAddress", "location"],
      cookieOptions: {
        name: "your_cookie_name", // optional
        httpOnly: true, // optional
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

app.controller.ts

```typescript
import { Controller, Get } from "@nestjs/common";
import { Fingerprint, RealIp } from "@dilanjer/fingerprint";

@Controller()
export class AppController {
  @Get()
  getFingerprint(@Fingerprint() fp: Fingerprint): Fingerprint {
    return fp;
  }

  @Get("my-ip-address")
  getMyIpAddress(@RealIp() ipAddress: string): string {
    return ipAddress;
  }
}
```

Fingerprint example:

```json
{
  "id": "79c0678d8672fafb932a97a1368d7bf3",
  "headers": {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "language": "en-US,en;q=0.9"
  },
  "userAgent": {
    "browser": {
      "name": "Chrome",
      "version": "xxx"
    },
    "device": {
      "model": "Other",
      "type": "0"
    },
    "os": {
      "name": "Windows",
      "version": "10"
    },
    "cpu": {
      "architecture": "xxx"
    }
  },
  "ipAddress": {
    "value": "xxx.xxx.xxx.xxx"
  },
  "location": {
    "city": "San Antonio",
    "country": "US",
    "region": "TX"
  }
}
```

## License

MIT © [Dialnjer](https://github.com/dilanjer)
