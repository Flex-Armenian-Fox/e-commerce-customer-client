<template>
  <div class="tab-content" style="display:block;">
    <div class="items">
      <div class="cl">&nbsp;</div>
      <ul>
        <li v-for="item in contents" :key="item.id">
          <div class="image"> <a><img :src="item.image_url" alt="" /></a> </div>
          <p> Item Number: <span>{{item.item_code}}</span><br />
            Brand Name: <a>{{item.brand}}</a> </p>
            Description : <span>{{item.name}}</span><br />
            Stock : <span>{{item.stock}}</span><br />
          <p class="price">Wholesale Price: <strong>RP: {{item.price}}</strong></p>
          <div v-if="isLogin">
              <p class="text-center"><input v-model="item.qty" type="number" class="form-control" placeholder="Qty" min="1"/></p>
              <button @click.prevent="addToCart(item)" class="btn btn-sm btn-primary">Add to Cart</button>
          </div>
        </li>
      </ul>
      <div class="cl">&nbsp;</div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'TabContent',
  props: ['contents'],
  data () {
    return {
      qty: 0
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  methods: {
    addToCart (item) {
      if (item.stock < item.qty) {
        Swal.fire({
          type: 'warning',
          title: 'Order cannot more then stock',
          showConfirmButton: true,
          timer: 1500
        })
      } else {
        const checkItem = this.$store.state.carts.filter(cart => cart.productid === item.id)
        console.log('CHECK ITEM', item.id, checkItem)
        if (checkItem.length === 0) {
          this.$store.dispatch('addCart', {
            productid: item.id,
            qty: item.qty,
            price: item.price,
            orderid: 0
          })
        } else {
          this.$store.dispatch('updateQty', { id: item.id, qty: checkItem.qty + item.qty })
        }
      }
    }
  },
  components: {
  }
}
</script>
