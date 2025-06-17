import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import dotenv from "dotenv";

// .env 파일 로딩
dotenv.config();

export default defineConfig({
    plugins: [react(), eslint()],
    server: {
        proxy: {
            "/api": {
                target: process.env.VITE_SERVER_URL,
                changeOrigin: true,
                secure: false,
            },
        },
    },
    appType: "spa",
});
 