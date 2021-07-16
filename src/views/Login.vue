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
    </div>
</template>

<script>
export default {
    data(){
        return {
            email: "",
            password: "",
            errMsg: "",
        }
    },
    methods: {
        login(){
            this.$store.dispatch('login', {email: this.email, password: this.password})
        }
    }
}
</script>

<style>

</style>