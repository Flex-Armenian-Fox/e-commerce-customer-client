<template>
  <div>

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

      <v-card-subtitle class="pb-0 title font-weight-bold uppercase orange--text text--darken-3">
        {{ product.name }}
      </v-card-subtitle>

      <v-card-text class="mb-0">
        <div class="grey--text text--darken-2 font-weight-bold">Rp{{ product.price }}</div>
        <div class="grey--text text--darken-1 font-italic font-weight-light">Stock: {{ product.stock }}</div>
      </v-card-text>

      <v-card-actions class="mt-0">
          <v-btn color="orange" text>
            Share
          </v-btn>

          <v-btn color="orange" text>
            Explore
          </v-btn>
        </v-card-actions>
      </v-card>

  </div>
</template>

<script>
export default {
    name: 'ProductComponent',
    props: ['productList']
}
</script>

<style>

</style>