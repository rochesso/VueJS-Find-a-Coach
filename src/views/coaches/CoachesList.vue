<template>
  <div>
    <BaseDialog :show="!!error" title="An error occurred!" @close="handleError">
      <p>{{ error }}</p>
    </BaseDialog>
    <section>
      <CoachFilter @change-filters="setFilters"></CoachFilter>
    </section>
    <section>
      <BaseCard>
        <div class="controls">
          <BaseButton mode="outline" @click="loadCoaches(true)">Refresh</BaseButton>
          <BaseButton
            v-if="!isLoggedIn"
            link
            :to="{ name: 'auth', query: { redirect: 'register' } }"
            >Login to register as a Coach</BaseButton
          >
          <BaseButton v-if="!isCoach && !isLoading && isLoggedIn" link :to="{ name: 'register' }"
            >Register as a Coach
          </BaseButton>
        </div>
        <div v-if="isLoading">
          <BaseSpinner></BaseSpinner>
        </div>
        <ul v-else-if="hasCoaches">
          <CoachItem v-for="coach in filteredCoaches" :key="coach.id" :coach="coach" />
        </ul>
        <h3 v-else>No coaches found.</h3>
      </BaseCard>
    </section>
  </div>
</template>

<script>
import CoachFilter from '../../components/coaches/CoachFilter.vue'
import CoachItem from '../../components/coaches/CoachItem.vue'

export default {
  components: {
    CoachItem,
    CoachFilter
  },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true
      }
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated
    },
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches']
      const filteredCoaches = []
      for (const coach of coaches) {
        for (const filter of Object.keys(this.activeFilters)) {
          if (coach.areas.includes(filter) && this.activeFilters[filter] === true) {
            const coachIsAdded = filteredCoaches.some((item) => item.id == coach.id)
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
      return !this.isLoading && this.$store.getters['coaches/hasCoaches']
    },
    isCoach() {
      return this.$store.getters['coaches/isCoach']
    }
  },
  created() {
    this.loadCoaches(false)
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters
    },
    async loadCoaches(forceRefresh) {
      this.isLoading = true
      try {
        await this.$store.dispatch('coaches/loadCoaches', { forceRefresh })
      } catch (error) {
        this.error = error.message || 'Something went wrong!'
      }
      this.isLoading = false
    },
    handleError() {
      this.error = null
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
