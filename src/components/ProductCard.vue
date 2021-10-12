<template>
  <div class="">
    <vs-tabs alignment="center" v-if="categories.length">
      <vs-tab
        label="All"
        v-model="currentCategoryId"
        @click="currentCategoryId = null"
      >
        <vs-row vs-justify="center">
          <vs-col
            type="flex"
            vs-justify="flex-start"
            vs-align="flex-start"
            vs-w="4"
            v-for="product in filterProductByCat"
            :key="product.id"
            style="margin:0.5em;"
          >
            <vs-card class="cardx" actionable fixedHeight>
              <div slot="header">
                <h3>{{product.name}}</h3>
              </div>
              <div slot="media">
                <img :src="product.image_url" />
              </div>
              <div>
                <span>
                  <p><b>Price (IDR): </b>{{product.price.toLocaleString('en-US')}}</p>
                  <p><b>Stock: </b>{{product.stock}}</p>
                </span>
              </div>
              <div slot="footer">
                <vs-row vs-justify="flex-end">
                  <vs-button
                    v-if="product.stock > 0
                      && isLogin
                      && !carts.find(e => e.product_id === product.id)"
                    type="gradient"
                    color="danger"
                    icon="shopping_cart"
                    @click.native="addToCart(product.id)"
                  ></vs-button>
                </vs-row>
              </div>
            </vs-card>
          </vs-col>
        </vs-row>
      </vs-tab>
      <div v-for="item in categories" :key="item.id">
        <vs-tab
          :label="item.category_name"
          v-model="currentCategoryId"
          :value="item.id"
          @click="currentCategoryId = item.id"
        >
        <vs-row vs-justify="center">
          <vs-col
            type="flex"
            vs-justify="flex-start"
            vs-align="flex-start"
            vs-w="4"
            v-for="product in filterProductByCat"
            :key="product.id"
            style="margin:0.5em;"
          >
            <vs-card actionable fixedHeight class="cardx">
              <div slot="header">
                <h3>{{product.name}}</h3>
              </div>
              <div slot="media">
                <img :src="product.image_url" />
              </div>
              <div>
                <span>
                  <p><b>Price (IDR): </b>{{product.price.toLocaleString('en-US')}}</p>
                  <p><b>Stock: </b>{{product.stock}}</p>
                </span>
              </div>
              <div slot="footer">
                <vs-row vs-justify="flex-end">
                  <vs-button
                    v-if="product.stock > 0
                      && isLogin
                      && !carts.find(e => e.product_id === product.id)"
                    type="gradient"
                    color="danger"
                    icon="shopping_cart"
                    @click.native="addToCart(product.id)"
                  ></vs-button>
                </vs-row>
              </div>
            </vs-card>
          </vs-col>
        </vs-row>
        </vs-tab>
      </div>
    </vs-tabs>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  methods: {
    addToCart(id) {
      this.$store.dispatch('productModule/addToCart', { productId: id });
      this.$vs.notify({
        title: 'Success',
        text: 'Success add to cart',
        color: 'success',
        position: 'top-right',
      });
    },
  },
  computed: {
    isLogin() {
      return this.$store.state.userModule.isLogin;
    },

    carts() {
      return this.$store.state.productModule.carts;
    },

    categories() {
      return this.$store.state.productModule.categories;
    },

    products() {
      return this.$store.state.productModule.products;
    },

    currentCategoryId: {
      get() {
        return this.$store.state.productModule.currentCategoryId;
      },
      set(value) {
        this.$store.commit('productModule/SET_CURRENT_CATEGORY_ID', +value);
      },
    },

    filterProductByCat: {
      get() {
        return this.$store.getters['productModule/filterProductByCat'];
      },
      set(value) {
        this.$store.commit('productModule/SET_CURRENT_CATEGORY_ID', +value);
      },
    },
  },
  created() {
    this.$store.dispatch('productModule/fetchCategories');
    this.$store.dispatch('productModule/fetchProducts');
    this.$store.dispatch('productModule/fetchCarts');
  },
};
</script>

<style>
  .con-exemple-prompt {
    padding: 10px;
    padding-bottom: 0px;
  }
  .vs-input {
    width: 100%;
    margin-top: 10px;
  }
</style>
