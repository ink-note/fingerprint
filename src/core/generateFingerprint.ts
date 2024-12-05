import { Request } from "express";
import { x64 } from "murmurhash3js";
import * as requestIp from "request-ip";
import {
  AcceptHeader,
  FingerPrint,
  IpAddress,
  Parameters,
  UserAgent,
  Location,
} from "src/type";
import { UAParser } from "ua-parser-js";
import * as geoip from "geoip-lite";

import uniqueParams from "../helpers/uniqueParams";

/**
 * Generate a fingerprint for the given request and parameters.
 *
 * @param {Request} req - The request object.
 * @param {Parameters[]} params - An array of parameters.
 * @return {FingerPrint} - An object containing the generated fingerprint.
 */
export default function generateFingerprint(
  req: Request,
  params: Parameters[]
): FingerPrint {
  params = uniqueParams(params);

  if (params.length === 0) {
    params = ["ipAddress"];
  }

  const object = params.reduce((obj, param) => {
    const handler = paramHandler[param];
    if (handler) {
      obj[param] = handler(req);
    }
    return obj;
  }, {} as Record<string, any>);

  const id = x64.hash128(JSON.stringify(object));
  return {
    id,
    ...object,
  } as FingerPrint;
}

/**
 * Handlers for each parameter type to extract data from the request.
 */
const paramHandler: Record<Parameters, (req: Request) => any> = {
  /**
   * Extracts the accept and language headers from the request headers.
   *
   * @param {Request} req - The request object containing headers.
   * @return {AcceptHeader} - An object with the accept, language, and encoding headers.
   */
  headers: (req: Request): AcceptHeader => {
    const { headers } = req;
    return {
      accept: headers["accept"],
      language: headers["accept-language"],
      encoding: headers["accept-encoding"],
    };
  },

  /**
   * Retrieves the IP address from the request object.
   *
   * @param {Request} req - The HTTP request object.
   * @return {IpAddress} - An object containing the IP address.
   */
  ipAddress: (req: Request): IpAddress => {
    const ip = requestIp.getClientIp(req);
    return { value: ip };
  },

  /**
   * Returns the user agent information parsed from the request headers.
   *
   * @param {Request} req - The request object.
   * @return {UserAgent} - The user agent information.
   */
  userAgent: (req: Request): UserAgent => {
    const userAgentString = req.headers["user-agent"];
    const parser = new UAParser(userAgentString);
    const { browser, cpu, device, os } = parser.getResult();

    return {
      browser: {
        name: browser.name || "unknown",
        version: browser.version || "0",
      },
      device: {
        model: device.model || "unknown",
        type: device.type || "unknown",
      },
      os: {
        name: os.name || "unknown",
        version: os.version || "0",
      },
      cpu: {
        architecture: cpu.architecture || "unknown",
      },
    };
  },

  /**
   * Retrieves location data based on the IP address.
   *
   * @param {Request} req - The HTTP request object.
   * @return {Location | null} - An object containing location data or null if not found.
   */
  location: (req: Request): Location | null => {
    const ip = paramHandler.ipAddress(req).value;
    const geo = geoip.lookup(ip);

    if (!geo) {
      return null;
    }

    const { country, city, region } = geo;

    return {
      city,
      country,
      region,
    };
  },
};
