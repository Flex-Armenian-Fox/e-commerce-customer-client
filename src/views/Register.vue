<template>
  <vs-row style="margin-top: 5em;" vs-justify="center">
    <vs-col type="center" vs-justify="center" vs-align="center" vs-w="6">
      <vs-card class="cardx" fixedHeight>
        <div slot="header">
          <h3>Register</h3>
        </div>
        <div>
          <vs-input
            style="width:100%;"
            size="large"
            label="Email"
            v-model="formRegister.email"
          />
          <vs-input
            style="width:100%;"
            size="large"
            type="password"
            label="Password"
            v-model="formRegister.password"
          />
          <vs-divider/>
          <vs-button color="primary" type="filled" @click="register">Create Account</vs-button>
          <vs-button
            style="margin-left: 0.5em;"
            color="danger"
            type="filled"
            @click="$router.push('/login')"
          >Cancel</vs-button>
        </div>
      </vs-card>
    </vs-col>
  </vs-row>
</template>

<script>
export default {
  name: 'Register',
  computed: {
    formRegister: {
      get() {
        return this.$store.state.userModule.formRegister;
      },
      set(value) {
        this.$store.commit('userModule/SET_FORM_REGISTER', value);
      },
    },
  },
  methods: {
    register() {
      this.$store.dispatch('userModule/register', this.formRegister);
    },
  },
};
</script>

<style>

</style>
