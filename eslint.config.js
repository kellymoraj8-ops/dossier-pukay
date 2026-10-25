const js = require("@eslint/js");

module.exports = [
  { ignores: ["node_modules/**", "stubs/**", "docs/api/**"] },
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",
      globals: {
        require: "readonly",
        module: "writable",
        process: "readonly",
        console: "readonly",
        fetch: "readonly",
        __dirname: "readonly",
        Buffer: "readonly",
      },
    },
  },
];
