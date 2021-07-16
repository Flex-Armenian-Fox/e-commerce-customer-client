<template>
  <div class="home">
    <div class="d-flex p-2 justify-content-around">
      <Card v-for="item in products" :key="item.id" :item="item" class="p-3"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from '../components/Card.vue'

export default {
  name: 'Home',
  components: {
    Card
  },
  mounted() {
    this.$store.dispatch('fetchData')
    this.$store.commit('CHECK_LOGIN')
  },
  computed: {
    products() {
      if(this.$route.params.name) return this.$store.getters.tagFilter(this.$route.params.name)
      else return this.$store.state.products
    }
  }
}
</script>
