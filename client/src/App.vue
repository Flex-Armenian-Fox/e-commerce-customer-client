<template>
  <v-app >
    <div>

      <NavbarComponent></NavbarComponent>

      <v-main>
        <router-view/>
      </v-main>

    </div>
  </v-app>
</template>

<script>
import NavbarComponent from './components/NavbarComponent.vue'

export default {
  name: 'App',
  components: {
    NavbarComponent
  },
  data: () => ({
    //
  })
};
</script>
