<template>
  <q-card square flat style="width: 400px" class="absolute-center text-grey-9">
    <q-card-section horizontal>
      <q-space />
      <span class="text-h5 text-weight-bold">SIGN IN</span>
      <q-space />
    </q-card-section>
    <q-card-section>
      <q-form @submit="login">
        <span class="text-weight-bold">Email</span>
        <q-input type="email" class="q-mt-sm q-mb-md" square outlined v-model="email" dense required />
        <span class="text-weight-bold">Password</span>
        <q-input class="q-mt-sm q-mb-md" :type="isPwd ? 'password' : 'text'" square outlined v-model="password" dense required>
          <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
          </template>
        </q-input>
        <q-btn type="submit" square class="full-width" color="black" size="md" label="sign in" />
      </q-form>
    </q-card-section>
    <q-card-section horizontal>
      <q-space />
      <span class="text-caption"
        >Dont't have an account? <router-link to="/register" class="text-black text-body2" style="text-decoration: none;">Sign Up</router-link></span
      >
      <q-space />
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      isPwd: true,
    };
  },
  methods: {
    login() {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>

<style></style>
