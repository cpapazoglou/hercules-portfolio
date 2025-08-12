import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'src/index.html',
        experience: 'src/pages/experience.html',
        education: 'src/pages/education.html',
        hobbies: 'src/pages/hobbies.html',
        contact: 'src/pages/contact.html'
      }
    }
  },
  server: {
    port: 8000,
    open: true
  }
});