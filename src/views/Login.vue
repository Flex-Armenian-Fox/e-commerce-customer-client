<template>
  <div class="col-4 mx-auto my-4" id="login-block">
      <h1 class="text-3xl font-bold text-center">Log In</h1>
      <div class="text-md font-bold text-center text-red-700" id="login-error">{{errMsg}}</div>
      <form id="login-form" @submit.prevent="login">
        <div class="form-group">
          <label for="login-email">Email address</label>
          <input type="email" class="form-control" v-model="email" aria-describedby="emailHelp" placeholder="Email">
        </div>
        <div class="form-group">
          <label for="login-password">Password</label>
          <input type="password" class="form-control" v-model="password" placeholder="Password">
        </div> <br>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
      <br>
      <p>or sign in with:</p>
      <div class="d-flex justify-content-center">
         <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin>
      </div>
    </div>
</template>

<script>
import GoogleLogin from 'vue-google-login';
export default {
    data(){
        return {
          email: "",
          password: "",
          errMsg: "",
          params: {
            client_id: "939064340244-6vnkag84h8hi4ujiemi0513rn8ipn6nr.apps.googleusercontent.com"
          },
          renderParams: {
              width: 150,
              height: 50,
              longtitle: false
          }
        }
    },
    components: {GoogleLogin},
    methods: {
      login(){
          this.$store.dispatch('login', {email: this.email, password: this.password})
      },
      onSuccess(googleUser) {
          var id_token = googleUser.getAuthResponse().id_token
          this.$store.dispatch('gLogin', {idToken: id_token})
      }
    }
}
</script>

<style>

</style>