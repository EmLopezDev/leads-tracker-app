import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");
    return {
        plugins: [],
        define: {
            __APP_ENV__: JSON.stringify(env.APP_ENV),
        },
    };
});
