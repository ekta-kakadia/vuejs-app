<template>
  <v-card>
    <v-card-title>
      <v-row>
        <v-col cols="8">Products </v-col>
      </v-row>
      <v-spacer />
    </v-card-title>
    <div class="pl-5 pr-5">
      <v-row>
        <v-col cols="4">
          <v-select
            placeholder="Select Filter"
            style="width: 200px"
            v-model="filterType"
            :items="filterItems"
          ></v-select>
        </v-col>
        <v-col cols="4">
          <v-text-field
            style="width: 200px"
            v-model="search"
            @keyup="onSearch"
            placeholder="Search"
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-icon @click="changeView('list')">mdi-format-list-bulleted</v-icon>
          <v-icon @click="changeView('grid')">mdi-grid</v-icon>
        </v-col>
        <v-col cols="2">
          <!-- Add Product -->
          <upsert-product :form="form" title="Add Product" />
          <!-- End -->
        </v-col>
      </v-row>
    </div>
    <!-- Grid View -->
    <div>
      <v-container>
        <v-row v-if="products && products.length > 0" key="products-list">
          <v-col v-for="card in products" :key="card.id" cols="3">
            <v-card>
              <router-link :to="{ path: `/product/${card.id}` }">
                <v-img
                  :src="card.image"
                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="200px"
                >
                  <v-card-title v-text="card.name"></v-card-title>
                </v-img>
              </router-link>
              <v-card-actions>
                <v-btn icon @click="show = !show">
                  <v-icon>{{
                    show ? "mdi-chevron-up" : "mdi-chevron-down"
                  }}</v-icon>
                </v-btn>
                <v-btn color="orange lighten-2" text> Explore </v-btn>
              </v-card-actions>

              <v-expand-transition>
                <div v-show="show">
                  <v-divider />
                  <v-btn icon>
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>

                  <v-btn icon>
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-spacer />
                  <v-card-text>
                    {{ card.description }}
                  </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col>
            <v-card>
              <v-card-title> No products available !! </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <!-- End Grid View -->
    </div>
    <!-- Pagination -->
    <div class="ma-5 text-center pb-5">
      <v-btn :disabled="skip === 0" class="mr-4" @click="onPrev" color="primary"
        >Prev</v-btn
      >
      <v-btn
        :disabled="this.$store.getters.products.length < 10"
        color="primary"
        @click="onNext"
        >Next</v-btn
      >
    </div>
    <!-- End Pagination -->
  </v-card>
</template>
<script>
import UpsertProduct from "./UpsertProducts.vue";

export default {
   name: "ProductList",
  components: {
    "upsert-product": UpsertProduct,
  },
  data() {
    return {
      filterType: "",
      filterItems: ["name", "category"],
      name: "",
      skip: 0,
      prev: 0,
      show: false,
      search: "",
      form: {
        name: "",
        price: "",
        discount: "",
      },
    };
  },
  mounted() {
    this.getProducts({ value: this.search, key: "" });
  },
  methods: {
    onSearch() {
      this.getProducts({
        skip: this.skip,
        value: this.search,
        key: this.filterType,
      });
    },
    onNext() {
      this.skip = this.skip + 10;
      this.$store
        .dispatch("products", { skip: this.skip })
        .then(() => {
          this.loading = false;
        })
        .catch((e) => e);
    },
    onPrev() {
      this.skip = this.skip - 10;
      this.$store
        .dispatch("products", { skip: this.skip })
        .then(() => {
          this.loading = false;
        })
        .catch((e) => e);
    },
    async getProducts(body) {
      const query = { skip: this.skip, value: body.value, key: body.key };
      this.loading = true;
      await this.$store
        .dispatch("products", query)
        .then(() => {
          this.loading = false;
        })
        .catch((e) => e);
    },
  },
  computed: {
    products() {
      return this.$store.getters.products;
    },
  },
};
</script>
