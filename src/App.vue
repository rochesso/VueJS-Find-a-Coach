<template>
  <TheHeader />
  <RouterView v-slot='slotProps'>
    <Transition name='route' mode='out-in'>
      <component :is='slotProps.Component'></component>
    </Transition>
  </RouterView>
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

<style scoped>
.route-enter-active {
  transition: all 0.1s ease-out;
}

.route-leave-active {
  transition: all 0.1s ease-in;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-enter-to {
  opacity: 1;
  transform: translateY(0px);
}

.route-leave-from {
  opacity: 1;
  transform: translateY(0px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>