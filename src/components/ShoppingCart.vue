<template>
  <div @click="test">
    <q-dialog v-model="dialog" persistent position="right" class="text-grey-9">
      <q-card square class="full-height" style="width: 500px">
        <q-card-section horizontal>
          <span class="q-my-sm q-ml-md text-weight-medium text-h5 text-uppercase poppins-font">your cart</span>
          <q-space />
          <q-btn icon="close" size="lg" flat round dense v-close-popup :to="route" />
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-card v-for="cart in carts" :key="cart.id" flat square style="height: 150px" class="full-width q-mb-lg">
            <q-card-section horizontal class="no-margin no-padding">
              <q-img class="q-mr-lg" style="max-width: 100px" :src="cart.Product.image_url1" />
              <q-card-section class="column no-margin no-padding">
                <span class="text-h6 q-mb-xs">{{ cart.Product.name }}</span>
                <span>Rp. {{ cart.Product.price }}</span>
                <q-space />
                <div style="max-width: 60px">
                  <q-input
                    type="number"
                    min="1"
                    :max="cart.Product.stock"
                    dense
                    square
                    outlined
                    v-model="cart.amount"
                    @change="editCart(cart.amount, cart.Product.stock, cart.id)"
                  ></q-input>
                </div>
              </q-card-section>
              <q-space />
              <q-card-section class="column no-margin no-padding">
                <q-space />
                <q-btn @click="deleteCart(cart.id)" dense :ripple="false" flat rounded icon="delete" />
                <q-space />
              </q-card-section>
            </q-card-section>
            <q-separator class="q-my-sm" />
          </q-card>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'ShoppingCart',
  setup() {
    return {
      dialog: ref(true),
    };
  },
  data() {
    return {};
  },
  computed: {
    carts() {
      return this.$store.state.carts;
    },
    route() {
      if (this.$route.path == '/cart') {
        return '/';
      } else {
        return '/shop';
      }
    },
  },
  methods: {
    editCart(amount, stock, id) {
      if (amount <= stock) {
        this.$store.dispatch('editCart', {
          amount,
          id,
        });
      }
    },
    deleteCart(id) {
      this.$store.dispatch('deleteCart', id);
    },
    validation(amount, stock) {
      // if(amount > stock)
      if (amount > stock) return false;
      console.log(this.cart.amount, 'masuk');
    },
  },
  created() {
    this.$store.dispatch('fetchCart');
  },
  watch: {},
};
</script>

<style></style>
