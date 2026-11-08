import {defineConfig} from 'vitest/config';
// Only the active source tree: exported or extracted deliveries are not test projects.
export default defineConfig({test:{include:['src/**/*.test.{ts,tsx,js}']}});
