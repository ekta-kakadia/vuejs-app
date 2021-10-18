<template>
  <div class="text-center">
    <!-- Product Details -->
    <v-card class="mx-auto my-12" max-width="374">
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>
      <v-img height="250" :src="productDetails.image"></v-img>
      <v-card-title>{{ productDetails.name }}</v-card-title>
      <v-card-text>
        <v-row align="center" class="mx-0">
          <v-rating
            :value="4.5"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>

          <div class="grey--text ms-4">4.5 (413)</div>
        </v-row>

        <div class="my-4 text-subtitle-1">
          Rs {{ productDetails.price }} ({{ productDetails.discount }} %)
        </div>

        <div>{{ productDetails.description }}</div>
      </v-card-text>
      <!-- End Product Details -->
      <v-divider class="mx-4" />

      <v-card-actions>
        <!-- Delete Product -->
        <v-dialog v-model="deleteDialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-icon color="danger" v-bind="attrs" v-on="on">mdi-delete</v-icon>
          </template>
          <v-card>
            <v-card-title class="text-h5 grey lighten-2"> Delete </v-card-title>
            <v-spacer />
            <v-card-text>
              Are you sure want to delete this product?
            </v-card-text>
            <v-divider />
            <v-card-actions>
              <v-spacer />
              <v-btn color="blue darken-1" text @click="deleteDialog = false">
                Close
              </v-btn>
              <v-btn color="primary" @click="deleteProduct"> Delete </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- End Delete -->

        <!-- Edit Product -->
        <upsert-product :form="productDetails" title="Edit Product" />
        <!-- End Edit -->
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import UpsertProduct from "./UpsertProducts.vue";

export default {
  components: {
    "upsert-product": UpsertProduct,
  },
  data() {
    return {
      deleteDialog: false,
    };
  },
  name: "ProductDetails",
  mounted() {
    this.getProductDetails();
  },
  methods: {
    getProductDetails() {
      this.$store
        .dispatch("getProductDetails", { id: this.$route.params.id })
        .then(() => {})
        .catch((e) => e);
    },
    deleteProduct() {
      this.$store
        .dispatch("deleteProduct", { id: this.$route.params.id })
        .then((response) => {
          if (response.message === "product deleted successfully!") {
            this.deleteDialog = false;
            this.$toasted.error(response.message, {
              theme: "bubble",
              position: "top-right",
              duration: 4000,
            });
            this.$store
              .dispatch("products", { skip: this.skip })
              .then(() => {
                this.$router.push("/productsList");
              })
              .catch((e) => e);
          }
        })
        .catch((e) => e);
    },
  },
  computed: {
    productDetails() {
      return this.$store.getters.productDetails;
    },
  },
};
</script>
