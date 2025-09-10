import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      // entry: file export của thư viện
      entry: resolve(__dirname, "src/index.js"),
      name: "CartLibrary",
      // tên file output sau khi build (es/umd)
      fileName: (format) => `cart-library.${format}.js`
    },
    rollupOptions: {
      // không bundle react và react-dom (để user cài riêng)
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM"
        }
      }
    }
  }
});
