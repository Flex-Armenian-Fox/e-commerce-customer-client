<template>
    <div class="d-flex flex-row"> 
        <img class="btn w-10 h-10 align-middle my-auto p-1" @click="toHome" src="../assets/home.png" alt="home">
        <div class="flex-fill">
            <div class="box pt-6 p-3">
                <div class="box-wrapper">
                    <div class=" bg-white rounded flex items-center w-full p-3 shadow-sm border border-gray-200">
                        <button class="outline-none focus:outline-none"><svg class=" w-5 text-gray-600 h-5 cursor-pointer" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>
                        <input type="search" list="tagList" name="" id="" placeholder="search for items" x-model="q" class="w-full pl-4 text-sm outline-none focus:outline-none bg-transparent" v-model="tag" @change="toTag">
                        <datalist id="tagList">
                            <option v-for="tag in tags" :key="tag.id" :value="tag.name"/>
                        </datalist>
                    </div>
                </div>
            </div>
        </div>
        <img class="btn w-10 h-10 align-middle my-auto p-1" @click="toCart" src="../assets/shopping-cart.png" alt="Cart">
        <img class="btn w-10 h-10 align-middle my-auto p-1" src="../assets/user.png" alt="User" @click="toUser">
    </div>
</template>

<script>
export default {
    data () {
        return {
            tag: ""
        }
    },
    methods: {
        toCart() {this.$router.push('/cart')},
        toUser() {this.$router.push('/user')},
        toHome() {this.$router.push('/')},
        toTag() {this.$router.push('/tag/' + this.tag)}
    },
    computed: {
        tags() {return this.$store.state.tags}
    }
}
</script>

<style>

</style>