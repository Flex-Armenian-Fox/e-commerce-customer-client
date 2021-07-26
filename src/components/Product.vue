<template>
  <q-dialog v-model="card">
    <q-card class="my-card" flat square bordered style="width: 700px; max-width: 80vw;">
      <q-card-section horizontal>
        <q-carousel class="col-6" animated v-model="slide" arrows infinite control-color="grey-7" navigation swipeable>
          <q-carousel-slide v-for="(url, i) in image_urls" :key="i" :name="i + 1">
            <q-img :src="product[`image_url${i + 1}`]" />
          </q-carousel-slide>
        </q-carousel>

        <q-card-section>
          <div class="text-h2 text-grey-9 text-weight-regular poppins-font">
            {{ product.name }}
          </div>
          <div class="q-ml-xs q-mt-sm q-mb-md text-subtitle1 text-weight-bold text-grey">Rp. {{ product.price }}</div>
          <div class="q-ml-xs text-body1 text-weight-medium text-grey-7">Description:</div>
          <div class="q-ml-xs text-body2 text-grey-7">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates doloremque commodi non! Vel, asperiores eos, aliquam repellendus iste
            optio voluptatem autem, commodi reprehenderit cum modi iusto excepturi et enim illum?
          </div>
          <div class="q-ml-xs q-mt-lg q-mb-xs text-caption text-grey-7">Stock: {{ product.stock }}</div>
          <q-btn
            @click="addToCart(product.id, $route.path)"
            v-close-popup
            class="full-width"
            color="black"
            size="md"
            label="add to cart"
            icon-right="o_shopping_bag"
          />
        </q-card-section>

        <!-- <q-card-section class="q-mb-sm"> -->
        <div class="q-ma-xs absolute-right">
          <q-btn icon="close" flat round dense v-close-popup to="/shop" />
        </div>
        <!-- </q-card-section> -->
      </q-card-section>

      <!-- <q-separator />

      <q-card-actions>
        <q-btn flat round icon="event" />
        <q-btn flat>
          5:30PM
        </q-btn>
        <q-btn flat>
          7:00PM
        </q-btn>
        <q-btn flat color="primary">
          Reserve
        </q-btn>
      </q-card-actions> -->
    </q-card>
    <!-- <Cart v-if="showCart"></Cart> -->

    <!-- <q-card class="my-card">
      <q-card-section class="q-mb-sm">
        <div class="q-ma-xs absolute-right">
          <q-btn icon="close" flat round dense v-close-popup to="/shop" />
        </div>
      </q-card-section>
      <q-img :src="product.image_url1" />

      <q-card-section>
        <q-btn fab color="primary" icon="place" class="absolute" style="top: 0; right: 12px; transform: translateY(-50%);" />

        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">
            Cafe Basilico
          </div>
          <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
            <q-icon name="place" />
            250 ft
          </div>
        </div>

        <q-rating v-model="stars" :max="5" size="32px" />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle1">
          $・Italian, Cafe
        </div>
        <div class="text-caption text-grey">
          Small plates, salads & sandwiches in an intimate setting.
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn v-close-popup flat color="primary" label="Reserve" />
        <q-btn v-close-popup flat color="primary" round icon="event" />
      </q-card-actions>
    </q-card> -->
  </q-dialog>
</template>

<script>
import Cart from '../components/ShoppingCart.vue';
import { ref } from 'vue';

export default {
  name: 'Product',
  components: {
    Cart,
  },
  setup() {
    return {
      card: ref(true),
      slide: ref(1),
    };
  },
  data() {
    return {};
  },
  computed: {
    product() {
      return this.$store.state.product;
    },
    image_urls() {
      return this.$store.getters.url;
    },
    routeBefore: {
      get() {
        return this.$store.state.routeBefore;
      },
      set(value) {
        this.$store.commit('SET_ROUTE', value);
      }
    },
    // showCart: {
    //   get() {
    //     return this.$store.state.showCart;
    //   },
    //   set(value) {
    //     this.$store.commit('SHOW_CART', value);
    //   },
    // },
    isLogin() {
      return this.$store.state.isLogin;
    },
  },
  methods: {
    addToCart(id, path) {
      if (!this.isLogin) {
        this.routeBefore = path;
        this.$router.push('/login');
      }
      else {
        this.$store.dispatch('addCart', id);
        this.$router.push('/shop/cart');
      }
    },
  },
  created() {},
};
</script>

<style></style>
