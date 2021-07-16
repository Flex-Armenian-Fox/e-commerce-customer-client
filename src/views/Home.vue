<template>
  <div class="home">
    <!-- Top -->
<div id="top">
  <div class="shell">
    <!-- Header -->
    <div id="header1">
      <h1 id="logo"><a href="#">Urgan Gear</a></h1>
      <div id="navigation">
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li v-if="isLogin"><a @click.prevent="cart" href="/carts">My Cart</a></li>
          <li v-if="!isLogin"><a @click.prevent="register" href="/register">Register</a></li>
          <li v-if="!isLogin"><a @click.prevent="login" href="/login">Login</a></li>
          <li v-if="isLogin"><a @click.prevent="logout" href="#">Logout</a></li>
          <!-- <li class="last"><a href="#">Contact</a></li> -->
        </ul>
      </div>
    </div>
    <!-- End Header -->
    <!-- Slider -->
    <CarouselImage/>
    <!-- End Slider -->
  </div>
</div>
<!-- Top -->
<!-- Main -->
<div id="main">
  <div class="shell">
    <!-- Search, etc -->
    <SearchBar/>
    <!-- End Search, etc -->
    <router-view />
    <TabComponent v-if="!isCart" :dataTab="categories"/>
  </div>
</div>
<!-- End Main -->
  </div>
</template>

<script>
// @ is an alias to /src
import CarouselImage from '@/components/CarouselImage.vue'
import SearchBar from '@/components/SearchBar.vue'
import TabComponent from '@/components/TabComponent.vue'
// import TabContent from '@/components/TabContent.vue'

export default {
  name: 'Home',
  components: {
    CarouselImage,
    SearchBar,
    TabComponent
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    },
    isCart () {
      return this.$store.state.isCart
    },
    categories () {
      return this.$store.state.categories
    }
  },
  methods: {
    login () {
      this.$router.push('login')
    },
    register () {
      this.$router.push('register')
    },
    logout () {
      this.$store.dispatch('logout')
    },
    cart () {
      this.$router.push('/carts')
    }
  },
  created () {
    if (localStorage.access_token) {
      this.$store.commit('SET_ISLOGIN', true)
    }
    this.$store.commit('SET_ISCART', false)
    this.$store.dispatch('getCategories')
    this.$store.dispatch('getProducts')
  }
}
</script>
