<template>
  <li ref="elementToObserve" class="item" :class="{ 'visible--enter': isVisible }">
    <h3>{{ fullName }}</h3>
    <h4>£{{ coach.hourlyRate }}/hour</h4>
    <div>
      <BaseBadge v-for="area in coach.areas" :key="area" :title="area" :type="area"></BaseBadge>
    </div>
    <div class="actions">
      <BaseButton mode="outline" link :to="{ name: 'contact', params: { coachId: coach.id } }">Contact</BaseButton>
      <BaseButton link :to="{ name: 'coachDetail', params: { coachId: coach.id } }">View Details</BaseButton>
    </div>
  </li>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useIntersect } from '../../composables/useIntersect'

const props = defineProps({
  coach: Object
})
const fullName = computed(() => {
  return props.coach.firstName + ' ' + props.coach.lastName
})

const isVisible = ref(false)
const observer = ref({})
const elementToObserve = ref({})

const onEnter = () => {
  isVisible.value = true
}

onMounted(() => {
  observer.value = useIntersect(elementToObserve.value, onEnter, () => { }, true, { threshold: 0.2 })
})

onUnmounted(() => {
  observer.value.disconnect()
})
</script>

<style scoped>
.item {
  visibility: hidden;
  transition: all 0.2s ease-in;
  transform: translateY(30px) scaleY(0.9);
}

.visible--enter {
  visibility: visible;
  transform: translateY(0px) scaleY(1);
}

li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
