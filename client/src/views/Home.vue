<template>
  <div class="home">
    
    <!-- <p class="indigo lighten-4 green--text text--darken-3">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit fugit illum nisi, ducimus provident facere deleniti itaque eum ipsam error soluta praesentium delectus sed optio. Dolorem dicta necessitatibus adipisci amet!</p> -->

    <!-- <h1 class="display-3">Massive</h1>
    <h1 class="display-2">Massive</h1> -->

    <!-- <v-btn class="green white--text" depressed>
      <v-icon left>mdi-cart</v-icon>
      <span>Add to Cart</span>
    </v-btn>

    <v-btn class="blue white--text" small depressed>
      <v-icon left small>mdi-cart</v-icon>
      <span>Add to Cart</span>
    </v-btn>

    <v-btn class="hidden-md-and-up">Buy now</v-btn> -->

    <br>
    <br>

    <v-container>
    <!-- START - PRODUCT CARD -->

    <v-layout wrap d-flex flex-row justify-center>

      <!-- <ProductComponent :productList="productList"></ProductComponent> -->

      <v-card
      xs12 sm3 md3 lg2 xl1
      class="mx-2 my-3"
      max-width="180"
      max-height="345"
      v-for="product in productList"
      :key="product.id"
      >
      
      <v-img
        class="white--text align-end"
        height="180px"
        :src="product.image_url"
      >
      </v-img>

      <v-card-subtitle class="pb-0 subtitle-1 font-weight-bold uppercase orange--text text--darken-3">
        {{ product.name }}
      </v-card-subtitle>

      <v-card-text class="mb-0">
        <div class="grey--text text--darken-2 font-weight-bold">Rp{{ priceFormatter(product.price) }}</div>
        <div class="grey--text text--darken-1 font-italic font-weight-light">Stock: {{ product.stock }}</div>
      </v-card-text>

      <v-card-actions class="mt-0 mb-1">
          <v-btn
            rounded
            outlined
            small
            color="green"
            dark
            @click.prevent="buyProduct(product.id)"
          >
            Add to Cart
          </v-btn>
        </v-card-actions>
      </v-card>
      
    </v-layout>
    <!-- END - PRODUCT CARD -->
    </v-container>

  </div>
</template>

<script>

// import ProductComponent from '../components/ProductComponent.vue'

  export default {
    name: 'Home',
    components: {
      // ProductComponent
    },
    computed: {
      slides () {
        return this.$store.state.slides
      },
      productList () {
        return this.$store.state.products
      }
    },
    methods: {
      checkAuth () {
          if (!localStorage.getItem('accesstoken')) {
              this.$store.dispatch('checkAuth', false)
          } else {
              this.$store.dispatch('checkAuth', true)
          }
      },
      priceFormatter (price) {
            let string = price.toString()
            let array = []
            let counter = 0

            for (let i = string.length-1; i >= 0; i--) {
                if (counter === 3) {
                    array.push(',')
                    counter = 0
                }
                array.push(string[i])
                counter++
            }

            let result = ''
            for (let i = array.length-1; i >= 0; i--) {
                result += array[i]
            }
            return result
      },
      buyProduct (productId) {
        this.$store.dispatch('buyProduct', productId)
      }
    },
    created () {
        this.checkAuth()
        this.$store.dispatch('fetchProducts')
    }
  }
</script>
