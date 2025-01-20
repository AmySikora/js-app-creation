import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // Basic JavaScript configuration
  {
    files: ["**/*.js"], // Applies to all `.js` files
    languageOptions: {
      ecmaVersion: 2021, // Use modern ECMAScript syntax
      sourceType: "script", // Set source type as script (CommonJS-style modules)
      globals: {
        ...globals.browser, // Include browser globals like `window`, `document`
        ...globals.node,    // Include Node.js globals like `require`, `module`
        $: "readonly",      // Add jQuery's `$` as a global
        define: "readonly", // For AMD-style modules
        exports: "readonly", // For CommonJS-style modules
        setImmediate: "readonly", // If used in polyfills
      },
    },
    rules: {
      // Add recommended rules
      ...pluginJs.configs.recommended.rules,

      // Customize or disable rules to suit your project
      "no-unused-vars": ["warn"], // Warn instead of error for unused vars
      "no-undef": ["error"], // Ensure all variables are defined
      "no-prototype-builtins": "off", // Allow direct access to Object.prototype
    },
  },
];
