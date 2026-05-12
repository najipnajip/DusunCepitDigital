import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

import node from '@astrojs/node';

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

  adapter: node({
    mode: 'standalone'
  })
});