<template>
  <TheHeader />
  <RouterView />
</template>

<script>
import { RouterView } from 'vue-router'
import TheHeader from './components/layout/TheHeader.vue'

export default {
  components: {
    TheHeader,
    RouterView
  }
}
</script>
