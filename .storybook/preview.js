import { setup } from '@storybook/vue3';
import Button from '../examples/components/BasicButton.vue';

setup((app) => {
  app.component('GlobalButton', Button);
});

export const parameters = {
  options: {
    storySort: {
      order: ['README', '*'],
    },
  },
};