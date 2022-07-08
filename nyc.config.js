module.exports = {
  "extends": "@istanbuljs/nyc-config-typescript",
  "include": [
    "src/models",
    "src/services",
    "src/controllers"
  ],
  "all": true,
  "reporter": [
    "text",
    "text-summary",
    "json-summary",
    "html",
    "lcov"
  ],
}
