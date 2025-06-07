import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA} from "vite-plugin-pwa";


const host = process.env.TAURI_DEV_HOST;
// @ts-expect-error process is a nodejs global
const isTauri: boolean = process.env.TAURI_DEBUG || process.env.TAURI;

export default defineConfig({
  base: './',
  plugins: [react(), VitePWA({
    strategies: 'injectManifest',
    srcDir: 'src',
    filename: 'sw.ts',
    registerType: 'autoUpdate',
    injectRegister: false,

    pwaAssets: {
      disabled: isTauri, // Disable PWA assets for Tauri
      config: true,
    },

    manifest: {
      name: 'Promptosaurus',
      short_name: 'Promptosaurus',
      description: 'AI Prompt Management Tool',
      theme_color: '#ffffff',
      display: 'standalone',
      icons: [
        {
          src: 'icon.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },

    injectManifest: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
    },

    devOptions: {
      enabled: !isTauri, // Enable PWA features only for web
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  })],

  // Tauri-specific configuration
  ...(isTauri && {
    clearScreen: false,
    server: {
      port: 5173,
      strictPort: true,
      host: host || false,
      hmr: host
        ? {
            protocol: "ws",
            host,
            port: 5174,
          }
        : undefined,
      watch: {
        ignored: ["**/src-tauri/**"],
      },
    },
    build: {
      // Tauri supports es2021
      target: process.env.TAURI_PLATFORM == "windows" ? "chrome105" : "safari13",
      // don't minify for debug builds
      minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
      // produce sourcemaps for debug builds
      sourcemap: !!process.env.TAURI_DEBUG,
    },
  })
})



// https://vitejs.dev/config/
// export default defineConfig({
//   // Add base path for proper asset loading when opening index.html directly
//   base: './',
//   plugins: [react(), VitePWA(manifestForPlugIn)],

//   // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
//   //
//   // 1. prevent vite from obscuring rust errors
//   clearScreen: false,
//   // 2. tauri expects a fixed port, fail if that port is not available
//   server: {
//     port: 1420,
//     strictPort: true,
//     host: host || false,
//     hmr: host
//       ? {
//           protocol: "ws",
//           host,
//           port: 1421,
//         }
//       : undefined,
//     watch: {
//       // 3. tell vite to ignore watching `src-tauri`
//       ignored: ["**/src-tauri/**"],
//     },
//   },
//   // to make use of `TAURI_DEBUG` and other env variables
//   // https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
//   envPrefix: ["VITE_", "TAURI_"],
//   build: {
//     // Tauri supports es2021
//     target: process.env.TAURI_PLATFORM == "windows" ? "chrome105" : "safari13",
//     // don't minify for debug builds
//     minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
//     // produce sourcemaps for debug builds
//     sourcemap: !!process.env.TAURI_DEBUG,
//   },
//   // Add path aliases for easier imports
//   resolve: {
//     alias: {
//       '@': resolve(__dirname, 'src'),
//     },
//   },
//   // Configure Vitest for testing
//   test: {
//     globals: true,
//     environment: 'jsdom',
//     setupFiles: ['./src/setupTests.ts'],
//     css: false,
//     coverage: {
//       provider: 'v8',
//       reporter: ['text', 'html'],
//       exclude: ['node_modules/', 'src/setupTests.ts'],
//     },
//   },
// });