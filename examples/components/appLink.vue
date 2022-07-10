<template>
  <a v-if="isExternalLink" v-bind="$attrs" :href="to" target="_blank">
    <slot />
  </a>
  <router-link
    v-else
    v-bind="$props"
    custom
    v-slot="{ isActive, href, navigate }"
  >
    <a
      v-bind="$attrs"
      :href="href"
      @click="navigate"
      :class="isActive ? activeClass : inactiveClass"
    >
      <slot />
    </a>
  </router-link>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import { RouterLink, useLink } from 'vue-router'

export default defineComponent({
  name: 'appLink',

  props: {
    ...RouterLink.props,
    inactiveClass: String,
  },

  setup(props) {
    const { href, isActive, navigate } = useLink(props)

    const isExternalLink = computed(
      () => typeof props.to === 'string' && props.to.startsWith('http')
    )

    return { isExternalLink, href, navigate, isActive }
  },
})
</script>