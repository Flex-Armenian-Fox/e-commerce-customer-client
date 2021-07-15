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

            <!-- BUTTON - CART -->
            <v-btn @click.prevent="drawer = !drawer" icon class="mr-3 orange lighten-4">
                <v-icon>mdi-shopping</v-icon>
            </v-btn>

            <!-- BUTTON - LOGOUT -->
            <v-btn @click.prevent="userLogout" depressed dark class="mr-3" color="orange darken-3">
                <span>Logout</span>
                <v-icon right>mdi-logout</v-icon>
            </v-btn>
        </v-app-bar>

        <!-- START - CART DRAWER -->
        <v-navigation-drawer
        v-model="drawer"
        width="400"
        right
        absolute
        bottom
        temporary
        >

            <v-card
            class="mx-auto"
            max-width="500"
            >
            <v-toolbar
            color="green"
            dark
            >

            <v-toolbar-title>Shopping Cart</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon @click="drawer = !drawer">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            </v-toolbar>

            <v-list two-line>
            <v-list-item-group
                multiple
            >
                <template >
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>Item name</v-list-item-title>

                        <v-list-item-subtitle
                        class="text--primary"
                        
                        >Item Headline</v-list-item-subtitle>

                        <v-list-item-subtitle>Item subtitle</v-list-item-subtitle>
                    </v-list-item-content>

                </v-list-item>

                
                </template>
            </v-list-item-group>
            </v-list>
        </v-card>

            <!-- <v-card
            class="mx-auto"
            max-width="500"
            >
            <v-toolbar
            color="green"
            dark
            >

            <v-toolbar-title>Shopping Cart</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon>mdi-close</v-icon>
            </v-btn>
            </v-toolbar>

            <v-list two-line>
            <v-list-item-group
                v-model="selected"
                active-class="pink--text"
                multiple
            >
                <template v-for="(item, index) in items">
                <v-list-item :key="item.title">
                    <v-list-item-content>
                        <v-list-item-title v-text="item.title"></v-list-item-title>

                        <v-list-item-subtitle
                        class="text--primary"
                        v-text="item.headline"
                        ></v-list-item-subtitle>

                        <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
                    </v-list-item-content>

                </v-list-item>

                <v-divider
                    v-if="index < items.length - 1"
                    :key="index"
                ></v-divider>
                </template>
            </v-list-item-group>
            </v-list>
        </v-card> -->

        </v-navigation-drawer>
        <!-- END - CART DRAWER -->

    </nav>
    <!-- END - NAVBAR LOGGED IN -->

</div>
</template>

<script>
export default {
    name: 'NavbarComponent',
    data () {
        return {
            drawer: false
        }
    },
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