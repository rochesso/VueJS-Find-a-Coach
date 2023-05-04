<template>
    <form @submit.prevent="submitForm">
        <div class="form-control" :class="{ invalid: !firstName.isValid }">
            <label for="firstName">First Name</label>
            <input type="text" id="firstName" v-model.trim="firstName.val" @blur="validateForm" />
            <p v-if="!firstName.isValid">First name must not be empty.</p>
        </div>
        <div class="form-control" :class="{ invalid: !lastName.isValid }">
            <label for="lastName">Last Name</label>
            <input type="text" id="lastName" v-model.trim="lastName.val" @blur="validateForm" />
            <p v-if="!lastName.isValid">Last name must not be empty.</p>
        </div>
        <div class="form-control" :class="{ invalid: !description.isValid }">
            <label for="description">Description</label>
            <textarea id="description" rows="5" v-model.trim="description.val" @blur="validateForm"></textarea>
            <p v-if="!description.isValid">Description must not be empty.</p>
        </div>
        <div class="form-control" :class="{ invalid: !hourlyRate.isValid }">
            <label for="rate">Hourly Rate</label>
            <input type="number" id="rate" v-model.number="hourlyRate.val" @blur="validateForm" />
            <p v-if="!hourlyRate.isValid">Rate must be greater than 0.</p>
        </div>
        <div class="form-control" :class="{ invalid: !areas.isValid }">
            <h3>Areas of Expertise</h3>
            <div>
                <input type="checkbox" id="frontend" value="frontend" v-model="areas.val" @blur="validateForm" />
                <label for="frontend">Frontend Development</label>
            </div>
            <div>
                <input type="checkbox" id="backend" value="backend" v-model="areas.val" @blur="validateForm" />
                <label for="backend">Backend Development</label>
            </div>
            <div>
                <input type="checkbox" id="career" value="career" v-model="areas.val" @blur="validateForm" />
                <label for="career">Career Advisory</label>
            </div>
            <p v-if="!areas.isValid">At least one expertise must be selected.</p>
        </div>
        <p v-if="!formIsValid">Please fix the above errors and submit again</p>
        <BaseButton>Register</BaseButton>
    </form>
</template>

<script>
export default {
    emits: ['save-data'],
    data() {
        return {
            firstName: {
                val: '',
                isValid: true
            },
            lastName: {
                val: '',
                isValid: true
            },
            description: {
                val: '',
                isValid: true
            },
            hourlyRate: {
                val: null,
                isValid: true
            },
            areas: {
                val: [],
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
                } else if (typeof this[key].val == 'number') {
                    if (this[key].val < 0 || !this[key].val) {
                        this[key].isValid = false
                        this.formIsValid = false
                    } else {
                        this[key].isValid = true
                    }
                } else if (Array.isArray(this[key].val)) {
                    if (this[key].val.length === 0) {
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
            const formData = {}
            // Loop to save each property's value that is inside our data()
            // in a new object named formData, used to create a new coach
            // example: instead of firstName: {val: '', isValid: true } we need firstName: ''
            for (const key of Object.keys(this.$data)) {
                if (typeof this[key] == 'boolean') {
                    continue
                } else {
                    formData[key] = this[key].val
                }
            }
            this.$emit('save-data', formData)
        }
    }
}
</script>

<style scoped>
.form-control {
    margin: 0.5rem 0;
}

label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
}

input[type='checkbox']+label {
    font-weight: normal;
    display: inline;
    margin: 0 0 0 0.5rem;
}

input,
textarea {
    display: block;
    width: 100%;
    border: 1px solid #ccc;
    font: inherit;
}

input:focus,
textarea:focus {
    background-color: #f0e6fd;
    outline: none;
    border-color: #3d008d;
}

input[type='checkbox'] {
    display: inline;
    width: auto;
    border: none;
}

input[type='checkbox']:focus {
    outline: #3d008d solid 1px;
}

h3 {
    margin: 0.5rem 0;
    font-size: 1rem;
}

.invalid label {
    color: red;
}

.invalid input,
.invalid textarea {
    border: 1px solid red;
}
</style>
