<script setup lang="ts">
defineProps({
  buttonText: String
})

function click() {
  console.log('button clicked')
}

console.log('BASIC BUTTON LOADED')
</script>

<template>
  <button @click="click">{{ buttonText }}</button>
</template>