import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

console.log("Loaded Env:", process.env.VITE_YT_API_KEY)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
