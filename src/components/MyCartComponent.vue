<template>
  <vs-row>
    <vs-col
      vs-offset="3"
      vs-type="flex"
      vs-justify="center"
      vs-align="center"
      vs-w="6"
      style="border:1px solid;"
    >
      <vs-list>
        <vs-list-header title="My Cart" icon="shopping_cart" />
        <vs-list-item
          v-for="item in carts"
          :key="item.id"
          :title="item.Product.name"
          :subtitle="item.Product.Category.category_name"
        >
          <vs-input-number v-model="item.total_quantity" :max="item.Product.stock"/>
          <vs-button
            @click="updateCart(item)"
            style="margin-right:0.5em;"
            color="primary"
          >Apply</vs-button>
          <vs-button @click="deleteCart(item)" color="danger">Delete</vs-button>
        </vs-list-item>
      </vs-list>
    </vs-col>
  </vs-row>
</template>

<script>
export default {
  name: 'MyCartComponent',
  data() {
    return {
      activeConfirm: false,
    };
  },
  computed: {
    carts() {
      return this.$store.state.productModule.carts;
    },
  },
  methods: {
    updateCart(item) {
      this.$store.dispatch('productModule/patchCart', {
        cartId: item.id,
        total_quantity: item.total_quantity,
      });
    },
    deleteCart(item) {
      console.log('deleted!', item);
      this.$store.dispatch('productModule/deleteCart', { id: item.id });
    },
  },
  created() {
    this.$store.dispatch('productModule/fetchCarts');
  },
};
</script>

<style>
  .cart-content {
    display: flex;
  }
</style>
