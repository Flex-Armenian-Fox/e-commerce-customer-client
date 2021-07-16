<template>
    <tr>
        <td><img :src="cart.Product.image_url" style="width: 50px; height: 50px"/> </td>
        <td>{{cart.Product.name}}</td>
        <td>Rp. {{cart.Product.price}}</td>
        <td><input class="form-control" type="text" v-model="cart.toBuy"/></td>
        <td class="text-right">Rp. {{totalPrice}}</td>
        <td class="text-right"><button class="btn btn-sm btn-success px-2" @click="buy"> <i class="fa fa-shopping-cart"></i> </button> <button class="btn btn-sm btn-primary px-2" @click="addCart"> <i class="fa fa-save"></i> </button> <button class="btn btn-sm btn-danger" @click="delCart"><i class="fa fa-trash"></i> </button> </td>
    </tr>
</template>

<script>
export default {
    props:['cart'],
    computed: {
        totalPrice() {return (this.cart.toBuy * this.cart.Product.price).toLocaleString()},
        stringedPrice() {return this.cart.Product.price.toLocaleString()}
    },
    methods: {
        delCart() {this.$store.dispatch('delCart', this.cart.id)},
        addCart() {this.$store.dispatch('addCart', {id: this.cart.Product.id, toBuy: this.cart.toBuy})},
        buy() {this.$store.dispatch('buyItem', {id: this.cart.Product.id, toBuy: this.cart.toBuy})}
    },
    mounted() {
        console.log(this.cart)
    }
}
</script>

<style>

</style>