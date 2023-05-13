<script setup lang="ts">
import { ref } from 'vue'

const disabled = ref(false)

function click() {
  disabled.value = true
}
</script>

<template>
  <button @click="click" :disabled="disabled"><slot /></button>
</template>