<template>
  <section>
    <BaseDialog :show="!!error" title="An error occurred!" @close="handleError">
      <p>{{ error }}</p>
    </BaseDialog>
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
  data() {
    return {
      error: null
    }
  },
  methods: {
    async saveData(formData) {
      try {
        await this.$store.dispatch('coaches/registerCoach', formData)
      } catch (error) {
        this.error = error.message || 'Something went wrong!'
        return
      }
      this.$router.replace({ name: 'coaches' })
    },
    handleError() {
      this.error = null
    }
  }
}
</script>
