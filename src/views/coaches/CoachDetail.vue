<template>
  <div>
    <div v-if="!isDataLoaded">
      <baseSpinner></baseSpinner>
    </div>
    <article v-else-if="!!selectedCoach">
      <section>
        <BaseCard>
          <h2>{{ fullName }}</h2>
          <h3>£{{ selectedCoach.hourlyRate }}/hour</h3>
        </BaseCard>
      </section>
      <section>
        <BaseCard>
          <BaseBadge
            v-for="area in selectedCoach.areas"
            :key="area"
            :type="area"
            :title="area"
          ></BaseBadge>
          <p>{{ selectedCoach.description }}</p>
        </BaseCard>
      </section>
      <section>
        <BaseCard>
          <header>
            <h2>Interested? Reach out now!</h2>
            <BaseButton link :to="{ name: 'contact', params: { coachId: selectedCoach.id } }"
              >Contact</BaseButton
            >
          </header>
          <RouterView></RouterView>
        </BaseCard>
      </section>
    </article>
    <BaseCard v-else>
      <h2>Couch not found!</h2>
      <p>
        This couch could not be found - maybe check out all our
        <RouterLink :to="{ name: 'coaches' }">coaches</RouterLink>
      </p>
    </BaseCard>
  </div>
</template>

<script>
export default {
  props: ['coachId'],
  data() {
    return {
      isDataLoaded: false,
      selectedCoach: undefined
    }
  },
  computed: {
    fullName() {
      return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName
    }
  },
  created() {
    this.loadCoaches()
  },
  methods: {
    async loadCoaches() {
      this.isDataLoaded = false
      // If the user refreshes the page inside this Component
      // The component needs to download the data to work
      try {
        if (this.$store.getters['coaches/coaches'].length === 0) {
          await this.$store.dispatch('coaches/loadCoaches', { forceRefresh: true })
        }
        const coach = this.$store.getters['coaches/coaches'].find(
          (coach) => coach.id === this.coachId
        )
        if (coach != undefined) {
          this.selectedCoach = coach
        }
      } catch (error) {
        this.$router.replace({ name: 'coaches' })
      }
      this.isDataLoaded = true
    }
  }
}
</script>

<style scoped>
p {
  margin-top: 1rem;
}
</style>
