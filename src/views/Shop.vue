<template>
  <div id="shop">
    <div class="q-pa-md row items-start justify-center q-gutter-md">
      <q-card flat bordered v-for="product in products" :key="product" class="my-card">
        <q-img :src="product.image_url1" class="cursor-pointer" @click="openProduct(product.id)"></q-img>

        <q-card-section>
          <div class="text-h6 cursor-pointer" @click="openProduct(product.id)">{{ product.name }}</div>
          <div class="text-subtitle2">Rp. {{ product.price }}</div>
        </q-card-section>

        <!-- <q-card-section class="q-pt-none">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi repudiandae officia magni expedita veritatis hic.
        </q-card-section> -->
      </q-card>
    </div>
    <router-view></router-view>
    <!-- <Cart v-if="showCart"></Cart> -->
  </div>
</template>

<script>
import Cart from '../components/ShoppingCart.vue';

export default {
  name: 'Shop',
  components: {
    Cart,
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
    showCart: {
      get() {
        return this.$store.state.showCart;
      },
      set(value) {
        this.$store.commit('SHOW_CART', value);
      },
    },
  },
  methods: {
    openProduct(id) {
      this.$store.dispatch('getProduct', id);
      // .then(() => {
      //   this.$router.push(`/shop/product/${id}`);
      // });
    },
  },
  created() {
    this.$store.commit('SET_HOME', false);
    this.$store.dispatch('fetchCart');
  },
  mounted() {
  },
};
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 250px;
}
</style>
