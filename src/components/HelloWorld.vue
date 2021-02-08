<template>
<div id="hello">
  
  {{ msgg }}
  {{ htext }}
  <div style="background-color:green; padding:50px">
    <div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
  <div class="flex-shrink-0">
    <img class="h-12 w-12" src="../assets/logo.png" alt="ChitChat Logo">
  </div>
  <div>
    <div class="text-xl font-medium text-left text-black">ChitChat</div>
    <p class="text-gray-500">You have a new message! {{ msgg }}</p>
  </div>
</div>
</div>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">Vite Documentation</a> |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button @click="state.count++">count is: {{ state.count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
  </div>
</template>

<script setup>
import { defineProps, reactive, defineComponent, createApp } from 'vue'

defineProps({
  msg: String,
  htext: String
})

const msgg = "Hello World"

const state = reactive({ count: 0 })

</script>

<style scoped>
a {
  color: #42b983;
}
</style>
