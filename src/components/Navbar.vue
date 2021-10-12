<template>
  <vs-navbar
    v-model="indexActive"
    :color="colorx"
    text-color="rgba(255,255,255,.6)"
    active-text-color="rgba(255,255,255,1)"
    class="myNavbar"
  >
    <div slot="title">
      <vs-navbar-title>Tokopakedi</vs-navbar-title>
    </div>
    <vs-navbar-item index="0" >
      <a href="#" @click.prevent="navigate('/')">Browse</a>
    </vs-navbar-item>
    <vs-navbar-item index="1" v-if="!isLogin">
      <a href="#" @click.prevent="navigate('/login')">Login</a>
    </vs-navbar-item>
    <vs-navbar-item index="2" v-if="isLogin">
      <span>
        <a href="#" @click.prevent="navigate('/mycart')">My Cart</a>
      </span>
    </vs-navbar-item>
    <vs-navbar-item index="3" v-if="isLogin">
      <span>
        <a href="#" @click.prevent="logout">Logout</a>
      </span>
    </vs-navbar-item>
    <vs-spacer></vs-spacer>
  </vs-navbar>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      colorx: '#1db952',
      indexActive: 0,
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.userModule.isLogin;
    },
  },
  methods: {
    navigate(path) {
      this.$router.push(path).catch(() => {});
    },
    logout() {
      this.$store.commit('userModule/SET_IS_LOGIN', false);
      localStorage.clear();
      this.$vs.dialog({
        color: 'success',
        title: 'Logged Out',
        text: 'Success Logout',
      });
      this.$router.push('/').catch(() => {});
    },
  },
};
</script>

<style >
  .input-color {
    margin-bottom: 10px;
    position: relative;
    display: block;
  }
  .myNavbar {
    color: rgb(255,255,255);
  }
</style>
