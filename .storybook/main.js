module.exports = {
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  stories: [
    "../packages/*/__stories__/index.ts"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    '@storybook/addon-controls'
  ]
}