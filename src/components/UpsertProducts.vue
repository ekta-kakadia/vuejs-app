<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" v-bind="attrs" v-on="on">{{ title }}</v-btn>
    </template>
    <v-card>
      <v-card-title class="text-h5 grey lighten-2"> {{ title }} </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-container>
            <v-text-field
              v-model="form.name"
              :rules="textRules"
              label="Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.price"
              label="Price"
              :rules="numberRules"
              type="number"
              required
            ></v-text-field>
            <v-select
              v-model="form.category"
              placeholder="Select"
              :items="category"
              :rules="[(v) => !!v || 'Item is required']"
              label="Category"
              required
            ></v-select>
            <v-text-field v-model="form.image" label="Image"></v-text-field>
            <v-text-field
              v-model="form.discount"
              label="Discount"
              :rules="textRules"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.net_price"
              label="Net Price"
              type="number"
              :rules="numberRules"
              required
            ></v-text-field>
            <v-textarea
              v-model="form.description"
              label="Description"
              required
              :rules="textRules"
            ></v-textarea>
          </v-container>
        </v-form>
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn color="blue darken-1" text @click="dialog = false">
          Close
        </v-btn>
        <v-btn color="primary" @click="submitProduct"> Add </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "UpsertProduct",
  props: {
    form: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
    },
  },
  mounted() {
    this.getCategoryList();
  },
  data() {
    return {
      valid: false,
      textRules: [(v) => !!v || "required"],
      numberRules: [(v) => !!v || "required"],
      dialog: false,
    };
  },
  methods: {
    async submitProduct() {
      if (this.$refs.form.validate()) {
        if (this.title === "Add Product") {
          await this.$store
            .dispatch("addProduct", this.form)
            .then((response) => {
              if (response.message === "Product added successfully") {
                this.$toasted.success("Product added successfully", {
                  theme: "bubble",
                  position: "top-right",
                  duration: 4000,
                });
                this.dialog = false;
                this.$store.dispatch("products", { skip: 0 });
              } else {
                this.$toasted.error(response.message, {
                  theme: "bubble",
                  position: "top-right",
                  duration: 4000,
                });
              }
            })
            .catch((e) => e);
        } else {
          this.$store
            .dispatch("editProduct", this.form)
            .then((response) => {
              if (response.message === "product was updated successfully.") {
                this.$toasted.success("product was updated successfully.", {
                  theme: "bubble",
                  position: "top-right",
                  duration: 4000,
                });
                this.dialog = false;
                this.$store
                  .dispatch("getProductDetails", { id: this.$route.params.id })
                  .catch((e) => e);
              } else {
                this.$toasted.error(response.message, {
                  theme: "bubble",
                  position: "top-right",
                  duration: 4000,
                });
              }
            })
            .catch((e) => e);
        }
      }
    },
    getCategoryList() {
      this.$store
        .dispatch("getCategoryList")
        .then(() => {})
        .catch((e) => e);
    },
  },
  computed: {
    category() {
      let array = [];
      this.$store.getters.categories.forEach((item) => {
        array.push(item.name);
      });
      return array;
    },
  },
};
</script>