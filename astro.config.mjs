import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'server',

  integrations: [
    react()
  ],

  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ['@tiptap/core', '@tiptap/pm']
    }
  },

  adapter: vercel()
});