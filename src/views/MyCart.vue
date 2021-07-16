<template>
  <div>
    <Navbar />
    <div class="content">
      <MyCartComponent />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import MyCartComponent from '@/components/MyCartComponent.vue';

export default {
  name: 'MyCart',
  components: { Navbar, MyCartComponent },
};
</script>

<style>
  .content {
    margin-top: 1rem;
  }
</style>
