<template>
  <div>
    <h1>My Cart</h1>
    <br>
    <a><router-link to="/">Back to Home</router-link></a>
    <button>Check Out</button>
    <br><br>
    <table id="cart" border="1">
        <tr>
            <th>No.</th>
            <th>Item Code</th>
            <th>Description</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Action</th>
        </tr>
        <tr v-for="(item, index) in cardList" :key="index">
            <td>{{index + 1}}</td>
            <td style="width:200px">{{item.product.item_code}}</td>
            <td style="width:500px">{{item.product.name}}</td>
            <td style="width:80px;">
                <input v-model="item.qty" type="number" @change="handleEditRow(item)">
            </td>
            <td>{{item.price}}</td>
            <td>
                <a @click="handleDeleteRow(item)">Delete</a>
            </td>
        </tr>
        <!-- <tr v-for="(item, index) in cardList" :key="index">
            {{item}}
            <td>index</td>
            <td><div contenteditable>{{ item.qty }}</div></td>
            <td>{{ item.price }}</td>
            <td>
                <a @click="handleDeleteRow(item)">Delete</a>
            </td>
        </tr> -->
    </table>
  </div>
    <!-- <b-table striped hover :items="items" :fields="fields">
      <template #cell(name)="data">
          <b-form-input v-if="selectedRow[data.index]" type="text" v-model="items[data.index].name"></b-form-input>
          <span v-else>{{data.value}}</span>
      </template>
      <template #cell(action)="data">
        <b-button @click="handleEditRow(data)">
            <span v-if="!selectedRow[data.index]">Edit</span>
            <span v-else>Done</span>
        </b-button>
        <b-button @click="handleDeleteRow(data)">
            <span>Delete</span>
        </b-button>
    </template>
    </b-table>
  </div> -->
</template>

<script>
import swal from 'sweetalert2'
export default {
  name: 'App',
  components: {},
  computed: {
    cardList () {
      return this.$store.state.carts
    }
  },
  methods: {
    handleEditRow (data) {
      console.log('EDIT', data)
      this.$store.dispatch('updateQty', { id: data.id, qty: data.qty })
    },
    handleDeleteRow (data) {
      swal.fire({
        title: 'Are You Sure To Delete This Data?',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: 'No'
      })
      this.$store.dispatch('deleteCart', { id: data.id })
    }
  },
  created () {
    this.$store.commit('SET_ISCART', true)
    this.$store.dispatch('getCarts')
  },
  destroyed () {
    this.$store.commit('SET_ISCART', false)
  }
}
</script>

<style scoped>
* {
    background-color: white;
    padding: 10px
}

#cart {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#cart td, #cart th {
  border: 1px solid #ddd;
  padding: 8px;
}

#cart tr:nth-child(even){background-color: #f2f2f2;}

#cart tr:hover {background-color: #ddd;}

#cart th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color:black;
  color: white;
}
</style>
