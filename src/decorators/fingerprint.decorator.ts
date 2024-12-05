import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { IFingerprint } from "src/type";
/**
 * Get fingerprint by request
 */
export const Fingerprint = createParamDecorator(
  (_, ctx: ExecutionContext): IFingerprint => {
    const request: Request & { fp: IFingerprint } = ctx
      .switchToHttp()
      .getRequest();
    return request.fp;
  }
);

export interface FingerPrint extends IFingerprint {}
