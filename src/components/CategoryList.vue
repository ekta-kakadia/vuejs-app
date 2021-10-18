<template>
  <div>
    <v-card>
      <v-card-title>Category</v-card-title>
      <v-divider />
      <v-spacer />
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, key) in categoryList" :key="item.id">
              <td>{{ key + 1 }}</td>
              <td>
                {{ item.name }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "CategoryList",
  mounted() {
    this.getCategory();
  },
  methods: {
    getCategory() {
      this.$store
        .dispatch("getCategoryList")
        .then(() => {})
        .catch((e) => e);
    },
  },
  computed: {
    categoryList() {
      return this.$store.getters.categories;
    },
  },
};
</script>