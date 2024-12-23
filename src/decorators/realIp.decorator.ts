import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { FingerPrint } from "src/type";

export const RealIp = createParamDecorator(
  (_, ctx: ExecutionContext): string => {
    const request: Request & { fp: FingerPrint } = ctx
      .switchToHttp()
      .getRequest();
    return request.fp.ipAddress.value;
  }
);
