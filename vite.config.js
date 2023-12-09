import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
//// BEGINNING OF MODIFICATION 
///  add build property here ->
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
//// END OF MODIFICATION 
});