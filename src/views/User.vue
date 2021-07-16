<template>
  <button class="btn btn-danger" @click="logout">Log out</button>
</template>

<script>
/* global gapi */
import router from '../router'
export default {
  methods: {
    logout(){
      if (gapi.auth2){
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.');
            localStorage.clear()
            router.push('/login')
        })
      }
      else {
        localStorage.clear()
        router.push('/login')
      }
    },
  }
}
</script>

<style>

</style>