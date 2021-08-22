<template>
  <div class="my-wrapper">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MyRouterWrapper'
})
</script>


<style scoped>
.my-wrapper {
  display: flex;
  max-width: 960px;
  align-items: center;
  justify-content: center;
}
</style>