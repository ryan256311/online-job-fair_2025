import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 🔽 この設定を experimental の外へ移動します
  outputFileTracingRoot: __dirname,

  /* config options here */

  // experimental ブロックから outputFileTracingRoot を削除
  experimental: {
    // 他の experimental な設定がなければ、このブロックは削除しても構いません
  },
};

export default nextConfig;