<template>
  <!-- Content -->
    <div id="content">
      <!-- Tabs -->
      <div class="tabs">
        <ul>
          <!-- <li><a href="#" class="active" v-for="(item, index) in dataTab" :key="index" @click.prevent="selectTab(item)"><span>{{item.name}}</span></a></li> -->
          <li v-for="(item, index) in dataTab" :key="index"><a class="active" @click.prevent="selectTab(item)"><span>{{item.name}}</span></a></li>
        </ul>
      </div>
      <!-- Tabs -->
      <!-- Container -->
      <div id="container">
        <div class="tabbed">
          <!-- First Tab Content -->
          <!-- <TabContent/> -->
          <TabContent :contents="contentData"/>
        </div>
        <!-- Brands -->
        <div class="brands">
          <h3>Brands</h3>
          <div class="logos"> <a href="#"><img src="css/images/logo1.gif" alt="" /></a> <a href="#"><img src="css/images/logo2.gif" alt="" /></a> <a href="#"><img src="css/images/logo3.gif" alt="" /></a> <a href="#"><img src="css/images/logo4.gif" alt="" /></a> <a href="#"><img src="css/images/logo5.gif" alt="" /></a> </div>
        </div>
        <!-- End Brands -->
        <!-- Footer -->
        <div id="footer">
          <!-- <div class="left"> <a href="#">Home</a> <span>|</span> <a href="#">Support</a> <span>|</span> <a href="#">My Account</a> <span>|</span> <a href="#">The Store</a> <span>|</span> <a href="#">Contact</a> </div> -->
          <!-- <div class="right"> &copy; e-Callero. Design by > </div> -->
        </div>
        <!-- End Footer -->
      </div>
      <!-- End Container -->
    </div>
    <!-- End Content -->
</template>

<script>
// @ is an alias to /src
import TabContent from '@/components/TabContent.vue'

export default {
  name: 'TabComponent',
  components: {
    TabContent
  },
  props: ['dataTab'],
  computed: {
    contentData () {
      return this.$store.getters.filteredProducts
    }
  },
  methods: {
    selectTab (item) {
      this.$store.commit('SET_ACTIVECATEGORY', item.id)
      console.log('ACTIVE => ', item.id)
    }
  }
}
</script>
