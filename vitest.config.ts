import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    name: "React Vite template",
    environment: "jsdom",
    coverage: {
      reporter: ["text", "json", "html"],
      include: ["src/**/*"],
      extension: [".ts", ".tsx"],
    },
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
  },
});
