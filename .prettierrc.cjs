// @ts-check

/** @type {import("prettier").Config} */
module.exports = {
  useTabs: false,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'none',
  printWidth: 80,
  // Since prettier 3.0, manually specifying plugins is required
  plugins: [
    require.resolve('@ianvs/prettier-plugin-sort-imports'),
    require.resolve('prettier-plugin-svelte'),
    require.resolve('prettier-plugin-tailwindcss')
  ],
  // This plugin's options
  importOrder: ['^@core/(.*)$', '', '^@server/(.*)$', '', '^@ui/(.*)$', '', '^[./]'],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderTypeScriptVersion: '5.0.0',
  overrides: [
    {
      files: '*.svelte',
      options: {
        parser: 'svelte'
      }
    }
  ]
};
