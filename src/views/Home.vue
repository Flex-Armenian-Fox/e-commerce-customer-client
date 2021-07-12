<template>
  <div>
    <Navbar />
    <div class="content">
      <ProductCard />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import ProductCard from '@/components/ProductCard.vue';

export default {
  name: 'Home',
  components: { Navbar, ProductCard },
};
</script>

<style scoped>
  .content {
    margin-top: 1rem;
  }
</style>
