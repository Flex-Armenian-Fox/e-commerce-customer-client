<template>
  <vs-row style="margin-top: 5em;" vs-justify="center">
    <vs-col type="center" vs-justify="center" vs-align="center" vs-w="6">
      <vs-card class="cardx" fixedHeight>
        <div slot="header">
          <h3>Login Now</h3>
        </div>
        <div>
          <vs-input
            style="width:100%;"
            size="large"
            label="Email"
            v-model="formLogin.email"
          />
          <vs-input
            style="width:100%;"
            size="large"
            type="password"
            label="Password"
            v-model="formLogin.password"
          />
          <vs-divider/>
          <vs-button color="primary" type="filled" @click="login">Sign In</vs-button>
          <vs-button
            style="margin-left: 0.5em;"
            color="primary"
            type="filled"
            @click="$router.push('/register')"
          >Register</vs-button>
          <vs-button
            style="margin-left: 0.5em;"
            color="danger"
            type="filled"
            @click="$router.push('/')"
          >Back To Store</vs-button>
        </div>
      </vs-card>
    </vs-col>
  </vs-row>
</template>

<script>
export default {
  name: 'Login',
  computed: {
    formLogin: {
      get() {
        return this.$store.state.userModule.formLogin;
      },
      set(value) {
        this.$store.commit('userModule/SET_FORM_LOGIN', value);
      },
    },
  },
  methods: {
    login() {
      this.$store.dispatch('userModule/login', this.formLogin);
    },
  },
};
</script>

<style>

</style>
