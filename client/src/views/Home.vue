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

    <!-- START - CAROUSEL SLIDES -->
    <section class="ml-8 mr-8">
      <v-carousel
      cycle
      height="300"
      hide-delimiter-background
      show-arrows-on-hover
      >

        <v-carousel-item
          v-for="(slide, i) in slides"
          :key="i"
        >
          <v-sheet
            color="green"
            height="100%"
          >
            <v-row
              class="fill-height"
              align="center"
              justify="center"
            >
              <div class="text-h2">
                {{ slide }}
              </div>
            </v-row>
          </v-sheet>
        </v-carousel-item>

      </v-carousel>
    </section>
    <!-- END - CAROUSEL SLIDES -->


    <v-container class="my-5">
    <!-- START - PRODUCT CARD -->

    <!-- <v-layout row wrap>
      <v-flex xs12 sm6>
        <v-btn block class="primary outlined">1</v-btn>
      </v-flex>
      
      <v-flex xs4 sm2>
        <v-btn block class="primary outlined">2</v-btn>
      </v-flex>

      <v-flex xs4 sm2>
        <v-btn block class="primary outlined">3</v-btn>
      </v-flex>

      <v-flex xs4 sm2>
        <v-btn block class="primary outlined">4</v-btn>
      </v-flex>
    </v-layout> -->

    <v-layout row wrap d-flex justify-center>
      <v-flex xs12 sm3 md3 lg2 xl1 class="mr-3 mb-4">
        <v-btn outlined block class="success">1</v-btn>
      </v-flex>
      
      <v-flex xs12 sm3 md3 lg2 xl1 class="mr-3 mb-4">
        <v-btn outlined block class="success">2</v-btn>
      </v-flex>

      <v-flex xs12 sm3 md3 lg2 xl1 class="mr-3 mb-4">
        <v-btn outlined block class="success">2</v-btn>
      </v-flex>

      <v-flex xs12 sm3 md3 lg2 xl1 class="mr-3 mb-4">
        <v-btn outlined block class="success">2</v-btn>
      </v-flex>

      <v-flex xs12 sm3 md3 lg2 xl1 class="mr-3 mb-4">
        <v-btn outlined block class="success">2</v-btn>
      </v-flex>

      <v-flex xs12 sm3 md3 lg2 xl1 class="mr-3 mb-4">
        <v-btn outlined block class="success">2</v-btn>
      </v-flex>

      <v-flex xs12 sm3 md3 lg2 xl1 class="mr-3 mb-4">
        <v-btn outlined block class="success">2</v-btn>
      </v-flex>
    </v-layout>

    <v-layout row wrap d-flex justify-center>
      <v-card
      xs12 sm3 md3 lg2 xl1
      class="mx-auto"
      max-width="180"
      >
      
      <v-img
        class="white--text align-end"
        height="200px"
        src="https://ecommerce-fruits-bucket.s3.ap-southeast-1.amazonaws.com/apelmalang.png"
      >
      </v-img>

      <v-card-subtitle class="pb-0 title font-weight-bold uppercase orange--text text--darken-3">
        Apel Malang
      </v-card-subtitle>

      <v-card-text class="text--primary">
        <div>Whitehaven Beach</div>

        <div>Whitsunday Island, Whitsunday Islands</div>
      </v-card-text>

      <v-card-actions>
          <v-btn color="orange" text>
            Share
          </v-btn>

          <v-btn color="orange" text>
            Explore
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card
      xs12 sm3 md3 lg2 xl1
      class="mx-auto"
      max-width="180"
      >
      
      <v-img
        class="white--text align-end"
        height="200px"
        src="https://ecommerce-fruits-bucket.s3.ap-southeast-1.amazonaws.com/apelmalang.png"
      >
      </v-img>

      <v-card-subtitle class="pb-0 title font-weight-bold uppercase orange--text text--darken-3">
        Apel Malang
      </v-card-subtitle>

      <v-card-text class="text--primary">
        <div>Whitehaven Beach</div>

        <div>Whitsunday Island, Whitsunday Islands</div>
      </v-card-text>

      <v-card-actions>
          <v-btn color="orange" text>
            Share
          </v-btn>

          <v-btn color="orange" text>
            Explore
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card
      xs12 sm3 md3 lg2 xl1
      class="mx-auto"
      max-width="180"
      >
      
      <v-img
        class="white--text align-end"
        height="200px"
        src="https://ecommerce-fruits-bucket.s3.ap-southeast-1.amazonaws.com/apelmalang.png"
      >
      </v-img>

      <v-card-subtitle class="pb-0 title font-weight-bold uppercase orange--text text--darken-3">
        Apel Malang
      </v-card-subtitle>

      <v-card-text class="text--primary">
        <div>Whitehaven Beach</div>

        <div>Whitsunday Island, Whitsunday Islands</div>
      </v-card-text>

      <v-card-actions>
          <v-btn color="orange" text>
            Share
          </v-btn>

          <v-btn color="orange" text>
            Explore
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card
      xs12 sm3 md3 lg2 xl1
      class="mx-auto"
      max-width="180"
      max-height="350"
      >
      
      <v-img
        class="white--text align-end"
        height="200px"
        src="https://ecommerce-fruits-bucket.s3.ap-southeast-1.amazonaws.com/apelmalang.png"
      >
      </v-img>

      <v-card-subtitle class="pb-0 title font-weight-bold uppercase orange--text text--darken-3">
        Apel Malang
      </v-card-subtitle>

      <v-card-text class="grey--text text--darken-2 font-weight-bold">
        <div>Rp50,500</div>
      </v-card-text>

      <v-card-actions>
          <v-btn color="orange" text>
            Share
          </v-btn>

          <v-btn color="orange" text>
            Explore
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-layout>
    <!-- END - PRODUCT CARD -->
    </v-container>

  </div>
</template>

<script>

  export default {
    name: 'Home',
    components: {
    },
    computed: {
      slides () {
        return this.$store.state.slides
      }
    },
    methods: {
      checkAuth () {
          if (!localStorage.getItem('accesstoken')) {
              this.$store.dispatch('checkAuth', false)
          } else {
              this.$store.dispatch('checkAuth', true)
          }
      }
    },
    created () {
        this.checkAuth()
    }
  }
</script>
