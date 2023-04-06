export default {
  title: 'Basic',
}

/**
 * STORYBOOK EXPORT
 */
/* STORYBOOK EXPORT -- BASIC */
const BasicTemplate = () => ({
  template: `
    <div>
      <GlobalButton button-text="Test Button" />
    </div>
  `
})

export const Default = BasicTemplate.bind({})
