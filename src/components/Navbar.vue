<template>
  <div id="navbar" class="">
    <q-header class="q-py-xs text-dark bg-white">
      <q-toolbar>
        <div class="q-pa-md q-gutter-sm absolute-left">
          <q-btn dense :ripple="false" flat round class="text-dark" icon="search" @click="(keyword = ''), (search = !search)" :color="color.search" />
        </div>
        <q-toolbar-title
          class="q-mt-sm q-pb-xs text-h4 text-center text-grey-8 poppins-font cursor-pointer"
          @click="(tab = 'home'), changeTab('home')"
          ><span class="text-weight-bold text-red">.</span><span class="text-weight-medium">dast</span
          ><span class="text-weight-light">inguished</span></q-toolbar-title
        >

        <div class="q-pa-md q-gutter-sm absolute-right">
          <q-btn dense :ripple="false" flat round class="text-dark" icon="person_outline" @click="login($route.path)" :color="color.person">
            <q-menu dense v-if="isLogin">
              <q-list dense style="min-width: 100px">
                <q-item dense clickable v-close-popup>
                  <q-item-section dense @click="logout">SIGN OUT</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn @click="showCart" dense :ripple="false" flat round class="text-dark" icon="o_shopping_bag" :color="color.bag">
            <q-badge v-if="carts.length > 0" color="green" floating transparent>{{ carts.length }}</q-badge>
          </q-btn>
        </div>
      </q-toolbar>

      <div v-if="search" class="q-mx-auto q-pt-xs q-pb-sm" style="max-width: 350px">
        <q-input @keyup="searchKeyword" square outlined v-model="keyword" label="Search" dense>
          <template v-slot:append>
            <q-icon name="close" @click="(text = ''), (search = !search)" class="cursor-pointer" />
          </template>
        </q-input>
      </div>

      <q-tabs v-if="!search" v-model="tab" @click="changeTab('')">
        <q-tab :ripple="false" class="letter-space q-mx-sm q-mt-xs" name="home" label="home" />
        <q-tab :ripple="false" class="letter-space q-mx-sm q-mt-xs" name="shop" label="shop" />
      </q-tabs>

      <div v-if="shop" class="bg-white">
        <q-tabs dense class="q-mb-xs" v-model="catTab" @click="changeCategory">
          <q-tab v-for="(cat, i) in categories" :key="i" :ripple="false" class="letter-space q-mx-xs cursor-pointer" :name="cat" :label="cat" />
        </q-tabs>
      </div>
    </q-header>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Navbar',

  setup() {
    return {
      tab: ref('home'),
      catTab: ref('all'),
      keyword: ref(''),
    };
  },

  data() {
    return {
      hover: false,
      categories: ['all', 'tees', 'Shirts', 'Pants', 'Outers', 'Accessories'],
      color: {
        person: '',
        bag: '',
        search: '',
      },
      search: false,
      shop: false,
    };
  },
  computed: {
    carts() {
      return this.$store.state.carts;
    },
    isLogin() {
      return this.$store.state.isLogin;
    },
    isHome() {
      if (this.$store.state.isHome) return 'home';
      else 'shop';
    },
    routeBefore: {
      get() {
        return this.$store.state.routeBefore;
      },
      set(value) {
        this.$store.commit('SET_ROUTE', value);
      },
    },
  },
  methods: {
    changeTab(home) {
      if (this.tab == 'shop' && !home) {
        this.shop = true;
        // this.catTab = 'all';
        // this.changeCategory();
        this.$router.push('/shop');
      } else if (this.tab == 'home' || home) {
        this.shop = false;
        this.$router.push('/');
      }
    },
    changeCategory() {
      this.categories.forEach((cat) => {
        if (this.catTab == cat) {
          this.$store.commit('FILTER_PRODUCTS', this.catTab);
        }
      });
    },
    showCart() {
      if (this.isLogin) {
        if (this.$route.path == '/') {
          this.$router.push('/cart');
        } else {
          this.$router.push(`${this.$route.path}/cart`);
        }
      } else this.login(this.$route.path);
    },
    login(path) {
      if (!this.isLogin) {
        this.routeBefore = path;
        this.$router.push('/login');
      }
    },
    logout() {
      localStorage.clear();
      this.$store.commit('SET_IS_LOGIN', false);
      this.$store.commit('SET_CARTS', []);
      // this.$router.push('/login');
    },
    // ! belum berfungsi
    searchKeyword() {
      console.log(this.keyword);
      // for (i = 0; i < li.length; i++) {
      //   a = li[i].getElementsByTagName("a")[0];
      //   txtValue = a.textContent || a.innerText;
      //   if (txtValue.toUpperCase().indexOf(filter) > -1) {
      //     li[i].style.display = "";
      //   } else {
      //     li[i].style.display = "none";
      //   }
      // }
      // this.$store.commit('KEYWORD_FILTER', this.keyword);
    },
  },
  created() {
    // console.log(this.$route.path);
    if (this.tab == 'home') {
      this.$router.push('/');
    }
    // this.changeCategory();
  },
};
</script>

<style scoped>
.tab-click {
  border-bottom: 1px solid red;
}
.default-border {
  border-bottom: 1px solid white;
}
</style>
