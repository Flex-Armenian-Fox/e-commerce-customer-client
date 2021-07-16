<template>
  <div id="card">
    <div id="card-content">
      <div id="card-title">
        <h2>REGISTER</h2>
        <!-- <div class="underline-title"></div> -->
      </div>
      <form method="post" class="form">
        <label for="user-email" style="padding-top:13px">
            &nbsp;Email
          </label>
        <input v-model="email" id="user-email" class="form-content" type="email" name="email" autocomplete="on" required />
        <div class="form-border"></div>
        <label for="user-password" style="padding-top:22px">&nbsp;Password
          </label>
        <input v-model="password" id="user-password" class="form-content" type="password" name="password" required />
        <div class="form-border"></div>
        <label for="user-address" style="padding-top:22px">&nbsp;Address
          </label>
        <input v-model="address" id="user-address" class="form-content" name="address" required />
        <div class="form-border"></div>
        <label for="user-phone" style="padding-top:22px">&nbsp;Phone No
          </label>
        <input v-model="phone" id="user-phone" class="form-content" type="number" name="phone" required />
        <div class="form-border"></div>
        <input @click.prevent="register" id="submit-btn" type="submit" name="submit" value="REGISTER" />
        <router-link id="login" to="/login">Already have account?</router-link>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data () {
    return {
      email: '',
      password: '',
      address: '',
      phone: ''
    }
  },
  methods: {
    register () {
      // console.log('MASUK', this)
      this.$store.dispatch('register', {
        email: this.email,
        password: this.password,
        phone: this.phone,
        address: this.address
      })
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
body {
  background: -webkit-linear-gradient(bottom, #2dbd6e, #a6f77b);
  background-repeat: no-repeat;
}
label {
  font-family: "Raleway", sans-serif;
  font-size: 11pt;
}
#forgot-pass {
  color: #2dbd6e;
  font-family: "Raleway", sans-serif;
  font-size: 10pt;
  margin-top: 3px;
  text-align: right;
}
#card {
  background: #fbfbfb;
  border-radius: 8px;
  box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.65);
  height: 550px;
  margin: 6rem auto 8.1rem auto;
  width: 450px;
}
#card-content {
  padding: 12px 44px;
}
#card-title {
  font-family: "Raleway Thin", sans-serif;
  letter-spacing: 4px;
  padding-bottom: 23px;
  padding-top: 13px;
  text-align: center;
}
#login {
  color: red;
  font-family: "Raleway", sans-serif;
  font-size: 10pt;
  margin-top: 16px;
  text-align: center;
}
#submit-btn {
  background: -webkit-linear-gradient(right, hsl(0, 67%, 24%), hsl(0, 0%, 0%));
  border: none;
  border-radius: 21px;
  box-shadow: 0px 1px 8px hsl(0, 67%, 24%);
  cursor: pointer;
  color: white;
  font-family: "Raleway SemiBold", sans-serif;
  height: 42.3px;
  margin: 0 auto;
  margin-top: 50px;
  transition: 0.25s;
  width: 153px;
}
#submit-btn:hover {
  box-shadow: 0px 1px 18px hsl(0, 92%, 37%);
}
.form {
  align-items: left;
  display: flex;
  flex-direction: column;
}
.form-border {
  background: -webkit-linear-gradient(right, red, black);
  height: 1px;
  width: 100%;
}
.form-content {
  background: #fbfbfb;
  border: none;
  outline: none;
  padding-top: 14px;
}
.underline-title {
  background: -webkit-linear-gradient(right, #a6f77b, #2ec06f);
  height: 2px;
  margin: -1.1rem auto 0 auto;
  width: 89px;
}
</style>
