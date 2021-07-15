<template>
<div>
    <!-- START - NAVBAR LOGGED OUT -->
    <nav v-if="!isLoggedIn">

        <!-- LOGO -->
        <v-app-bar flat app height="70">
            <a href="#" @click.prevent="toHomePage" class="text-decoration-none">
            <v-toolbar-title class="text-uppercase display-1 orange--text text--darken-3">
                <span class="font-weight-regular">Baru</span>
                <span class="font-weight-black">Panen</span>
            </v-toolbar-title>
            </a>
            <!-- KASIH JARAK ANTARA LOGO - BUTTONS REGISTER/LOGIN -->
            <v-spacer></v-spacer>

            <!-- BUTTON REGISTER / LOGIN -->
            <v-btn @click.prevent="toRegisterPage" depressed dark class="mr-3" color="orange darken-3">
                <span>Register</span>
                <v-icon right>mdi-account-plus</v-icon>
            </v-btn>

            <v-btn @click.prevent="toLoginPage" depressed dark color="green">
                <span>Login</span>
                <v-icon right>mdi-arrow-right-circle-outline</v-icon>
            </v-btn>
        </v-app-bar>

    </nav>
    <!-- END - NAVBAR LOGGED OUT -->

    <!-- START - NAVBAR LOGGED IN -->
    <nav v-else-if="isLoggedIn">

        <!-- LOGO -->
        <v-app-bar flat app height="70">
            <v-toolbar-title class="text-uppercase display-1 orange--text text--darken-3">
                <span class="font-weight-regular">Baru</span>
                <span class="font-weight-black">Panen</span>
            </v-toolbar-title>

            <!-- KASIH JARAK ANTARA LOGO - BUTTONS REGISTER/LOGIN -->
            <v-spacer></v-spacer>

            <!-- BUTTON LOGOUT -->
            <v-btn @click.prevent="userLogout" depressed dark class="mr-3" color="orange darken-3">
                <span>Logout</span>
                <v-icon right>mdi-logout</v-icon>
            </v-btn>
        </v-app-bar>

    </nav>
    <!-- END - NAVBAR LOGGED IN -->

</div>
</template>

<script>
export default {
    name: 'NavbarComponent',
    computed: {
        isLoggedIn () {
            return this.$store.state.isLoggedIn
        }
    },
    methods: {
        toRegisterPage () {
            this.$store.dispatch('toRegisterPage')
        },
        toLoginPage () {
            this.$store.dispatch('toLoginPage')
        },
        toHomePage () {
            this.$store.dispatch('toHomePage')
        },
        userLogout () {
            this.$store.dispatch('userLogout')
        },
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

<style>

</style>