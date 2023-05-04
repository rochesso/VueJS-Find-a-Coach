<template>
  <form @submit.prevent='submitForm'>
    <div class="form-control" :class='{ invalid: !email.isValid }'>
      <label for="email">Your E-Mail</label>
      <input type="email" id='email' v-model.trim='email.val' @blur='validateForm' />
      <p v-if="!email.isValid">E-Mail must be valid and not be empty.</p>

    </div>
    <div class="form-control" :class='{ invalid: !message.isValid }'>
      <label for="message">Message</label>
      <textarea rows='5' id='message' v-model.trim='message.val' @blur='validateForm'></textarea>
      <p v-if="!message.isValid">Message must not be empty.</p>

    </div>
    <div class="actions">
      <BaseButton>Send Message</BaseButton>
    </div>
  </form>
</template>

<script>
export default {
  emits: ['save-request'],
  data() {
    return {
      email: {
        val: '',
        isValid: true
      },
      message: {
        val: '',
        isValid: true
      },
      formIsValid: true
    }
  },
  methods: {
    validateForm() {
      this.formIsValid = true
      const data = this.$data
      // Loop to go thru each property inside our data()
      // and validate each of them individually
      for (const key of Object.keys(data)) {
        if (typeof this[key].val == 'string') {
          if (this[key].val === '') {
            this[key].isValid = false
            this.formIsValid = false
          } else {
            this[key].isValid = true
          }
        } else if (typeof this[key] == 'boolean') {
          continue
        } else {
          this[key].isValid = false
          this.formIsValid = false
        }
      }
    },
    submitForm() {
      this.validateForm()
      if (!this.formIsValid) {
        return
      }
      const newRequest = {
        // Using the coach id stored in our route as :coachId
        // We need to know for which coach is the request
        coachId: this.$route.params.coachId
      }
      // Loop to save each property's value that is inside our data()
      // in a new object named newRequest, used to create a request
      // example: instead of email: {val: '', isValid: true } we need email: ''
      for (const key of Object.keys(this.$data)) {
        if (typeof this[key] == 'boolean') {
          continue
        } else {
          newRequest[key] = this[key].val
        }
      }
      this.$store.dispatch('requests/contactCoach', newRequest)
      this.$router.replace({ name: 'coaches' })
    }
  }
}
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>