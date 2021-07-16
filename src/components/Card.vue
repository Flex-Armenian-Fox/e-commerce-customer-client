<template>
  <div class="card" style="width: 18rem;">
    <img class="card-img-top" :src="item.image_url || 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png'" alt="Card image cap">
    <div class="card-body">
        <h5 class="card-title">{{item.name}}</h5>
        <p class="card-text">{{item.description}}</p>
        <div class="d-flex justify-content-between">
            <p class="my-auto">Rp. {{item.price}}.00</p>
            <div class="float-right w-50" v-if="isLoggedIn">
                <label>In Cart</label><br>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <button class="btn btn-outline-secondary" @click="minusCart" type="button">-</button>
                    </div>
                    <input type="text" class="form-control text-center" v-model="buyNum" @change="update" aria-describedby="basic-addon1">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" @click="addCart" type="button">+</button>
                    </div>
                </div> 
            </div>
        </div>
        <div class="mx-auto">
            <a v-if="change" class="btn mx-auto w-75 btn-success" @click="saveCart">Save Cart</a>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            change: 0,
            toBuy: 0
        }
    },
    props: ['item'],
    methods: {
        addCart() {
                this.buyNum++
                this.update()
            },
        minusCart() {
                if (this.buyNum > 0) this.buyNum--
                this.update()
            },
        saveCart() {
                console.log(this.item.id)
                this.change = 0
                this.$store.dispatch('addCart',{toBuy: this.buyNum, id: this.item.id})
            },
        update() {
            this.change = 1
            if(this.buyNum > this.item.stock) {this.buyNum = this.item.stock}
        }
    },
    computed: {
        isLoggedIn() {return this.$store.state.isLoggedIn},
        buyNum: {
                get: function() {return this.item.Carts[0]? this.item.Carts[0].toBuy : this.toBuy},
                set: function(newValue) {
                    this.toBuy = newValue
                    if(this.item.Carts[0]) {this.item.Carts[0].toBuy = newValue}
                }
            }
    },
    mounted(){
        this.change = 0
    }
}
</script>

<style>

</style>