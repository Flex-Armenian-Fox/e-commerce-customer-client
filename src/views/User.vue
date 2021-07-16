<template>
  <button class="btn btn-danger" @click="logout">Log out</button>
</template>

<script>
/* global gapi */
export default {
  methods: {
    logout(){
      if (gapi.auth2){
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.');
            localStorage.clear()
            this.$router.push('/')
        })
      }
      else {
        localStorage.clear()
        this.$router.push('/')
      }
    },
  }
}
</script>

<style>

</style>