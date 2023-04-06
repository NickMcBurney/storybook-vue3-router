import { setup } from '@storybook/vue3';
import Button from '../examples/components/BasicButton.vue';

console.log('PREVIEW.js')

setup((app) => {
  console.log('SETUP')
  app.component('GlobalButton', Button);
});

export const parameters = {
  options: {
    storySort: {
      order: ['README', '*'],
    },
  },
};