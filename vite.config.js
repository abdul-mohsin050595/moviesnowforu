import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // ...other build options...
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        // Add any other entry points you have
      },
    },
    // Copy the _redirects file to the output directory
    assets: {
      // Specify the source path of _redirects
      // Adjust the destination path as needed
      "./_redirects": "_redirects",
    },
  },
});
