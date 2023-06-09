import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:4000/'
  },
  viewportWidth: 1600,
  viewportHeight: 900,
  video: false
});
