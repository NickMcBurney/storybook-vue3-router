<template>
  <div class="my-wrapper">
    <div class="intro">
      <h1>{{ title }}</h1>
      <p><code>Path: {{ fullPath }}</code></p>
    </div>

    <!-- @slot pass `<router-view>` to slot -->
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'RouterViewWrapper',
  props: {
    title: {
      type: String,
      default: 'Storybook Vue 3 Router'
    }
  },
  setup () {
    const route = useRoute()
    const fullPath = computed(() => route.fullPath )

    return { fullPath }
  }
})
</script>


<style>
.my-wrapper {
  display: flex;
  flex-wrap: wrap;
  max-width: 960px;
  align-items: center;
  /* justify-content: center; */
  font-family: "Nunito Sans", -apple-system, ".SFNSText-Regular", "San Francisco", BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif
}

.intro {
  flex-basis: 100%;
}

h1 {
  flex-basis: 100%;
}

/* router transition CSS */
.slide-fade-enter-active {
  transition: all .5s .5s ease-out;
}

.slide-fade-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(100px);
  opacity: 0;
}

button {
  appearance: none;
  border: none;
  font-family: "Nunito Sans", -apple-system, ".SFNSText-Regular", "San Francisco", BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif;
  padding: 10px 16px;
  border-radius: 4px;
  background: #1da7fd;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

button.grey {
  background: #777;
}

a {
  color: #1da7fd;
}
</style>
