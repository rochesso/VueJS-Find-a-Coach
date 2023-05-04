<template>
  <section>
    <BaseCard>
      <h2>Register as a coach now!</h2>
      <CoachForm @save-data="saveData"></CoachForm>
    </BaseCard>
  </section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue'

export default {
  components: {
    CoachForm
  },
  methods: {
    saveData(formData) {
      this.$store.dispatch('coaches/registerCoach', formData)
      this.$router.replace({ name: 'coaches' })
    }
  }
}
</script>
