const { defineConfig } = require("cypress");

module.exports = defineConfig({

  env: {
    viewportWidth: 360,
    viewportHeight: 640,
  },
  e2e: {
    baseUrl: "http://localhost:3000",    
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    retries: 0
  },
});
 