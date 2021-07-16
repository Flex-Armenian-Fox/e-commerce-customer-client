<template>
<div class="container mb-4">
    <div class="row">
        <div class="col-12">
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col"> </th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col" class="text-center">Quantity</th>
                            <th scope="col" class="text-right">Total</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        <Cart v-for="cart in carts" :key="cart.id" :cart="cart"/>
                        <!-- <tr>
                            <td><img src="https://dummyimage.com/50x50/55595c/fff" /> </td>
                            <td>Product Name Dada</td>
                            <td>In stock</td>
                            <td><input class="form-control" type="text" value="1" /></td>
                            <td class="text-right">124,90 €</td>
                            <td class="text-right"><button class="btn btn-sm btn-danger"><i class="fa fa-trash"></i> </button> </td>
                        </tr> -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Cart from '../components/Cart.vue'
export default {
    computed:{
        carts() {return this.$store.state.carts}
    },
    components: {Cart},
    mounted() {
        this.$store.dispatch('getCart')
    }
}
</script>

<style>

</style>