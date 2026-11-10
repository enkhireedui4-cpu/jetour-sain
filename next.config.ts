// Deployment settings, responsive images and narrowly scoped security headers.
import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
const nextConfig: NextConfig = {
    ...(process.env.VERCEL ? {} : { output: "standalone" as const }),
    outputFileTracingRoot: dirname(fileURLToPath(import.meta.url)),
    typescript: {
        ignoreBuildErrors: false,
    },
    reactStrictMode: false,
    poweredByHeader: false,
    devIndicators: false,
    images: {
        formats: ["image/avif", "image/webp"],
        deviceSizes: [360, 420, 640, 768, 1024, 1280, 1600, 1920],
        imageSizes: [64, 96, 128, 256, 384],
    },
    async redirects() {
        return [{ source: "/test-drive", destination: "/info-request", permanent: true }];
    },
    async headers() {
        return [
            {
                source: "/:path*",
                headers: [
                    { key: "X-Frame-Options", value: "SAMEORIGIN" },
                    { key: "X-Content-Type-Options", value: "nosniff" },
                    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                    {
                        key: "Strict-Transport-Security",
                        value: "max-age=31536000",
                    },
                    {
                        key: "Permissions-Policy",
                        value: "camera=(), microphone=(), geolocation=()",
                    },
                    {
                        key: "Content-Security-Policy",
                        value: [
                            "default-src 'self'",
                            "script-src 'self' 'unsafe-inline' https://connect.facebook.net https://www.googletagmanager.com",
                            "style-src 'self' 'unsafe-inline'",
                            "img-src 'self' data: blob: https://www.facebook.com https://www.google-analytics.com https://www.googletagmanager.com",
                            "font-src 'self' data:",
                            "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com https://connect.facebook.net https://www.facebook.com",
                            "frame-src https://www.google.com https://www.facebook.com",
                            "frame-ancestors 'self'",
                            "base-uri 'self'",
                            "form-action 'self' https://www.facebook.com/tr/",
                            "object-src 'none'",
                        ].join("; "),
                    },
                ],
            },
            {
                source: "/models/:model/spin/mobile-v1/:path*",
                headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
            },
        ];
    },
};
export default nextConfig;
