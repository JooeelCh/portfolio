import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin"

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  images: {
    formats: ["image/webp", "image/avif"],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
