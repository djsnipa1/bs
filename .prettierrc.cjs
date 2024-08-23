module.exports = {
  useTabs: false,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'none',
  printWidth: 80,
  plugins: [
    require.resolve('prettier-plugin-svelte'),
    require.resolve('prettier-plugin-tailwindcss')
  ],
  overrides: [
    {
      files: '*.svelte',
      options: {
        parser: 'svelte'
      }
    }
  ]
};
