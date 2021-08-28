<template>
  <div class="my-wrapper">
    <h1>{{ title }}</h1>
    <!-- @slot pass `<router-view>` to slot -->
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MyRouterWrapper',
  props: {
    title: {
      type: String,
      default: 'Storybook Vue 3 Router'
    }
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
</style>
