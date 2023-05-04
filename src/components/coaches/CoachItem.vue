<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>£{{ coach.hourlyRate }}/hour</h4>
    <div>
      <BaseBadge v-for="area in coach.areas" :key="area" :title="area" :type="area"></BaseBadge>
    </div>
    <div class="actions">
      <BaseButton mode="outline" link :to="{ name: 'contact', params: { coachId: coach.id } }"
        >Contact</BaseButton
      >
      <BaseButton link :to="{ name: 'coachDetail', params: { coachId: coach.id } }"
        >View Details</BaseButton
      >
    </div>
  </li>
</template>

<script>
export default {
  props: ['coach'],
  computed: {
    fullName() {
      return this.coach.firstName + ' ' + this.coach.lastName
    }
  }
}
</script>

<style scoped>
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
