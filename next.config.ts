import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any,
};

export default nextConfig;
