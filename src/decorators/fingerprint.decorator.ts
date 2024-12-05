import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { FingerPrint } from "src/type";
/**
 * Get fingerprint by request
 */
export const Fingerprint = createParamDecorator(
  (_, ctx: ExecutionContext): FingerPrint => {
    const request: Request & { fp: FingerPrint } = ctx
      .switchToHttp()
      .getRequest();
    return request.fp;
  }
);
