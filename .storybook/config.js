import { configure, addParameters, addDecorator } from '@storybook/react';
// import { withPropsTable } from 'storybook-addon-react-docgen';
// import { withA11y } from '@storybook/addon-a11y';

// addDecorator(withPropsTable);
// addDecorator(withA11y);
// addParameters({
//   options: {
//     showPanel: true
//   }
// })

configure(require.context('../packages', true, /__stories__\/(.+)\.ts(x)?$/), module);
