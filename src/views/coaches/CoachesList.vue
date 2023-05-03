<template>
  <section>
    <CoachFilter @change-filters='setFilters'></CoachFilter>
  </section>
  <section>
    <BaseCard>
      <div class="controls">
        <BaseButton mode="outline">Refresh</BaseButton>
        <BaseButton v-if='!isCoach' link :to="{ name: 'register' }">Register a Coach</BaseButton>
      </div>
      <ul v-if="hasCoaches">
        <CoachItem v-for="coach in filteredCoaches" :key="coach.id" :coach="coach" />
      </ul>
      <h3 v-else>No coaches found.</h3>
    </BaseCard>
  </section>
</template>

<script>
import CoachFilter from '../../components/coaches/CoachFilter.vue';
import CoachItem from '../../components/coaches/CoachItem.vue'

export default {
  components: {
    CoachItem,
    CoachFilter
  },
  data() {
    return {
      activeFilters: {
        frontend: true,
        backend: true,
        career: true
      }
    }

  },
  computed: {
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches']
      const filteredCoaches = []
      for (const coach of coaches) {
        for (const filter of Object.keys(this.activeFilters)) {
          if (coach.areas.includes(filter) && this.activeFilters[filter] === true) {
            const coachIsAdded = filteredCoaches.some(item => item.id == coach.id)
            if (!coachIsAdded) {
              filteredCoaches.push(coach)
              break
            } else {
              break
            }
          }
        }
      }
      return filteredCoaches
    },
    hasCoaches() {
      return this.$store.getters['coaches/hasCoaches']
    },
    isCoach() {
      return this.$store.getters['coaches/isCoach']
    }
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
