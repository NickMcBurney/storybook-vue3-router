import path from 'path'
import initStoryshots from '@storybook/addon-storyshots';

initStoryshots({
  framework: 'vue3',
  configPath: path.join(__dirname, '../.storybook')
});
