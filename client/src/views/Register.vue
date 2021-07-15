<template>
  
  <div class="d-flex flex-row align-center justify-center"  max-width="400">

      <div class="d-flex flex-column align-center">
      <v-card-title class="text-uppercase font-weight-light orange--text text--darken-3">
              Create a new account
      </v-card-title>

      <section v-if="isError" class="caption red--text">{{ errorMessage }}</section>
      </div>

  <v-card class="mx-10 my-10" width="400">

      <v-card-text>
          <v-form class="px-4">

                <v-text-field
                v-model="email"
                prepend-icon="mdi-email-outline"
                :rules="emailRules"
                label="E-mail"
                required
                ></v-text-field>

                <v-text-field
                v-model="password"
                prepend-icon="mdi-lastpass"
                label="Password"
                :rules="[rules.required, rules.min]"
                :type="'password'"
                name="input-10-1"
                class="mb-5 mt-7"
                ></v-text-field>

                <v-btn
                :disabled="!valid"
                color="green"
                outlined
                class="mr-4"
                @click.prevent="userRegister"
                >
                Submit
                </v-btn>

                <v-btn
                color="orange darken-4"
                outlined
                class="mr-4"
                @click.prevent="toHomePage"
                >
                Cancel
                </v-btn>

          </v-form>
      </v-card-text>
  </v-card>
  </div>

</template>

<script>
export default {
    name: 'RegisterPage',
    computed: {
      isError () {
        return this.$store.state.isError
      },
      errorMessage () {
        return this.$store.state.errorMessage
      }
    },
    data () {
        return {
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            valid: true,
            password: '',
            rules: {
              required: value => !!value || 'Required.',
              min: v => v.length >= 5 || 'Min 5 characters',
            }
        }
    },
    methods: {
      userRegister () {
        const input = {email: this.email, password: this.password}
        this.$store.dispatch('userRegister', input)
      },
      toHomePage () {
        this.$store.dispatch('toHomePage')
      }
    },
}
</script>

<style>

</style>