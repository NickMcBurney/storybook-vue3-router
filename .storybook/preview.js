import { setup } from '@storybook/vue3';
import Button from '../examples/components/BasicButton.vue';

export const parameters = {
  options: {
    storySort: {
      order: ['README', '*'],
    },
  }
};

// Test global setup() is still called
setup((app) => {
  console.log('PREVIEW.JS setup() log')
  app.component('GlobalButton', Button);
});

const preview = {
  decorators: [
    (story) => ({
      components: { story },
      template: '<Suspense><story /></Suspense>',
    }),
  ],
};

export default preview;
