<template>
  <div>
    <section>
      <BaseCard>
        <h2>{{ fullName }}</h2>
        <h3>£{{ selectedCoach.hourlyRate }}/hour</h3>
      </BaseCard>
    </section>
    <section>
      <BaseCard>
        <BaseBadge v-for="area in selectedCoach.areas" :key="area" :type="area" :title="area"></BaseBadge>
        <p>{{ selectedCoach.description }}</p>
      </BaseCard>
    </section>
    <section>
      <BaseCard>
        <header>
          <h2>Interested? Reach out now!</h2>
          <BaseButton link :to="{ name: 'contact', params: { coachId: selectedCoach.id } }">Contact</BaseButton>
        </header>
        <RouterView></RouterView>
      </BaseCard>
    </section>
  </div>
</template>

<script>
export default {
  props: ['coachId'],
  data() {
    return {
      selectedCoach: undefined
    }
  },
  computed: {
    fullName() {
      return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName
    }
  },
  created() {
    this.selectedCoach = this.$store.getters['coaches/coaches'].find(
      (coach) => coach.id === this.coachId
    )
  }
}
</script>
