<template>
  <vs-navbar
    v-model="indexActive"
    :color="colorx"
    text-color="rgba(255,255,255,.6)"
    active-text-color="rgba(255,255,255,1)"
    class="myNavbar"
  >
    <div slot="title">
      <vs-navbar-title>Navbar Color</vs-navbar-title>
    </div>
    <vs-navbar-item index="0" >
      <a href="#">Home</a>
    </vs-navbar-item>
    <vs-navbar-item index="1">
      <a href="#">News</a>
    </vs-navbar-item>
    <vs-navbar-item index="2">
      <a href="#">Update</a>
    </vs-navbar-item>
    <vs-navbar-item index="3">
      <span>
        <a href="#">
          <vs-icon icon="shopping_cart"></vs-icon>
        </a>
      </span>
    </vs-navbar-item>
    <vs-spacer></vs-spacer>
  </vs-navbar>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      colorx: '#1db952',
      indexActive: 0,
    };
  },
};
</script>

<style >
  .input-color {
    margin-bottom: 10px;
    position: relative;
    display: block;
  }
  .myNavbar {
    color: rgb(255,255,255);
  }
</style>
