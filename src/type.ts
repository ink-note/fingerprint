export type Parameters = "headers" | "userAgent" | "ipAddress" | "location";

export interface ModuleConfigs {
  params?: Parameters[];
  cookieOptions?: {
    name?: string;
    httpOnly?: boolean;
    domain?: string;
  };
}

export const defaultModuleConfigs: ModuleConfigs = {
  params: ["ipAddress", "headers", "userAgent", "location"],
  cookieOptions: {
    name: "fp",
    httpOnly: true,
  },
};

export interface AcceptHeader {
  accept: string;
  language: string;
  encoding: string;
}

export interface IpAddress {
  value: string;
}

export interface UserAgent {
  browser: {
    name?: string;
    version?: string;
  };
  device: {
    model?: string;
    type?: string;
  };
  os: {
    name?: string;
    version?: string;
  };
  cpu?: {
    architecture?: string;
  };
}

export interface Location {
  country: string;
  region: string;
  city: string;
}

export interface FingerPrint extends AcceptHeader, UserAgent, IpAddress {
  id: string;
  headers: AcceptHeader;
  userAgent: UserAgent;
  ipAddress: IpAddress;
  location?: Location;
}

export const DEFAULT_COOKIE_NAME = "fp";
