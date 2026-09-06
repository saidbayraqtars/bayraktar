import { defineConfig } from '@playwright/test'
export default defineConfig({
  testDir: './tests', fullyParallel: true, workers: 3, timeout: 45000,
  use: { baseURL: 'http://127.0.0.1:3010', channel: 'msedge', headless: true, trace: 'retain-on-failure' },
  reporter: [['list']],
})

