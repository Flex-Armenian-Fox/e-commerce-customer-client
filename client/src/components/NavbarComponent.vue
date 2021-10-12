<template>
<div>
    <!-- START - NAVBAR LOGGED OUT -->
    <nav v-if="!isLoggedIn">

        <!-- LOGO -->
        <v-app-bar flat app height="100">
            <a href="#" @click.prevent="toHomePage" class="text-decoration-none">
            <v-toolbar-title class="ml-10 text-uppercase display-1 orange--text text--darken-3 d-flex flex-row align-center">
                <img :src="BaruPanenLogo" height="60">
                <span class="mt-3 font-weight-regular text-uppercase display-1 orange--text text--darken-3">Baru</span>
                <span class="mt-3 font-weight-black text-uppercase display-1 orange--text text--darken-3">Panen</span>
            </v-toolbar-title>
            </a>
            <!-- KASIH JARAK ANTARA LOGO - BUTTONS REGISTER/LOGIN -->
            <v-spacer></v-spacer>

            <!-- BUTTON REGISTER / LOGIN -->
            <v-btn @click.prevent="toRegisterPage" depressed large dark class="mr-3" color="orange darken-3">
                <span>Register</span>
                <v-icon right>mdi-account-plus</v-icon>
            </v-btn>

            <v-btn @click.prevent="toLoginPage" depressed large dark class="mr-10" color="green">
                <span>Login</span>
                <v-icon right>mdi-arrow-right-circle-outline</v-icon>
            </v-btn>
        </v-app-bar>

    </nav>
    <!-- END - NAVBAR LOGGED OUT -->

    <!-- START - NAVBAR LOGGED IN -->
    <nav v-else-if="isLoggedIn">

        <!-- LOGO -->
        <v-app-bar flat app height="100">
            <a href="#" @click.prevent="toHomePage" class="text-decoration-none">
            <v-toolbar-title class="ml-10 text-uppercase display-1 orange--text text--darken-3 d-flex flex-row align-center">
                <img :src="BaruPanenLogo" height="60">
                <span class="mt-3 font-weight-regular text-uppercase display-1 orange--text text--darken-3">Baru</span>
                <span class="mt-3 font-weight-black text-uppercase display-1 orange--text text--darken-3">Panen</span>
            </v-toolbar-title>
            </a>
            <!-- KASIH JARAK ANTARA LOGO - BUTTONS REGISTER/LOGIN -->
            <v-spacer></v-spacer>

            <!-- NAMA USERNAME -->
            <div class="overline mr-3 grey--text text--darken-1">Hello, {{ currentUser }}</div>

            <!-- BUTTON - CART -->
            <v-btn @click.prevent="drawer = !drawer" icon class="mr-3 orange lighten-4">
                <v-icon>mdi-shopping</v-icon>
            </v-btn>

            <!-- BUTTON - LOGOUT -->
            <v-btn @click.prevent="userLogout" depressed large dark class="mr-3" color="orange darken-3">
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
            <v-list-item-group multiple>

                <template>
                <v-list-item v-for="item in currentCart" :key="item.id">
                    <v-list-item-avatar>
                        <v-img
                        :src="item.Product.image_url"
                        width="20"
                        ></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <div>
                            <v-list-item-title class="body-1 font-weight-bold grey--text text--darken-2">{{ item.Product.name }}</v-list-item-title>
                            <v-list-item-subtitle>Rp{{ priceFormatter(item.Product.price) }}/pc</v-list-item-subtitle>
                            <v-list-item-subtitle class="subtitle-2 mt-1 green--text">Total: Rp{{ priceFormatter(item.Product.price * item.quantity)}}</v-list-item-subtitle>
                        </div>
                    </v-list-item-content>

                    <v-list-item-action class="d-flext flex-column justify-end">
                        <v-btn
                            class="mb-2"
                            outlined
                            small
                            color="orange"
                            @click.prevent="deleteCart(item.id)"
                        >
                        Remove
                        </v-btn>

                        <v-list-item-action class="d-flex flex-row">

                            <v-icon @click="minusQty(item.id, item.quantity)" color="green" class="mr-3">
                            mdi-minus-circle-outline
                            </v-icon>

                            <div class="ma-1">
                                <v-list-item-subtitle
                                class="text--primary"
                                >{{ item.quantity }}</v-list-item-subtitle>
                            </div>

                            <v-icon @click="plusQty(item.id, item.quantity)" color="green" class="ml-3">
                            mdi-plus-circle-outline
                            </v-icon>
                        </v-list-item-action>
                    </v-list-item-action>

                </v-list-item>
                </template>

            </v-list-item-group>
            </v-list>

            <v-container v-if="currentGrandTotal > 0">

                <v-row class="grey lighten-3 d-flex flex-row align-center justify-center">
                    <v-col class="ml-6">
                        <v-row class="font-weight-normal green--text text--darken-2">
                            GRAND TOTAL
                        </v-row>
                        <v-row class="font-weight-black h4">
                            Rp{{ priceFormatter(currentGrandTotal) }}
                        </v-row>
                    </v-col>

                    <v-col class="ml-10">
                        <v-btn
                        class="ma-2"
                        color="success"
                        >
                        Checkout
                        </v-btn>
                    </v-col>   
                </v-row>

            </v-container>
            
        </v-navigation-drawer>
        <!-- END - CART DRAWER -->

    </nav>
    <!-- END - NAVBAR LOGGED IN -->

</div>
</template>

<script>
import BaruPanenLogo from '../assets/barupanenlogo-02.png'

export default {
    name: 'NavbarComponent',
    data () {
        return {
            drawer: false,
            BaruPanenLogo
        }
    },
    computed: {
        isLoggedIn () {
            return this.$store.state.isLoggedIn
        },
        currentUser () {
            return localStorage.getItem('currentEmail')
        },
        currentCart () {
            return this.$store.state.currentCart
        },
        currentGrandTotal () {
            return this.$store.state.currentGrandTotal
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
        },
        priceFormatter (price) {
            let string = price.toString()
            let array = []
            let counter = 0

            for (let i = string.length-1; i >= 0; i--) {
                if (counter === 3) {
                    array.push(',')
                    counter = 0
                }
                array.push(string[i])
                counter++
            }

            let result = ''
            for (let i = array.length-1; i >= 0; i--) {
                result += array[i]
            }
            return result
        },
        deleteCart (cartId) {
            this.$store.dispatch('deleteCart', cartId)
        },
        minusQty (cartId, itemCurrentQty) {
            let updatedQty = +itemCurrentQty - 1
            this.$store.dispatch('updateCart', {cartId: cartId, newQuantity: updatedQty})
        },
        plusQty (cartId, itemCurrentQty) {
            let updatedQty = +itemCurrentQty + 1
            this.$store.dispatch('updateCart', {cartId: cartId, newQuantity: updatedQty})
        },
    },
    created () {
        this.checkAuth()
        this.$store.dispatch('fetchCart')
        console.log(this.currentCart)
    }
}
</script>

<style>

</style>