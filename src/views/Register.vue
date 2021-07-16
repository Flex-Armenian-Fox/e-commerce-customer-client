<template>
    <div class="col-4 mx-auto my-4" id="register-block">
      <h1 class="text-3xl font-bold text-center">Register</h1>
      <div class="text-md font-bold text-center text-red-700" id="register-error">{{errMsg}}</div>
      <form id="register-form" @submit.prevent="register">
        <div class="form-group">
          <label for="register-email">Email address</label>
          <input type="email" class="form-control" v-model="email" aria-describedby="emailHelp" placeholder="Email">
        </div>
        <div class="form-group">
          <label for="register-password">Password</label>
          <input type="password" class="form-control" v-model="password" placeholder="Password">
        </div>
        <div class="form-group">
          <label for="register-password2">Confirm Password</label>
          <input type="password" class="form-control" v-model="password2" placeholder="Password">
        </div> <br>
        <button type="submit" class="btn btn-primary">register</button>
      </form>
    </div>
</template>

<script>
export default {
    data(){
        return {
            email: "",
            password: "",
            password2: "",
            errMsg: "",
        }
    },
    methods: {
        register() {
            this.errMsg = ""
            if (this.password != this.password2) this.errMsg="password does not match"
            else {
                this.$store.dispatch('register', {email: this.email, password: this.password})
            }
        }
    }
}
</script>

<style>

</style>