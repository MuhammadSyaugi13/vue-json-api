<template>
  <div class="container py-5">
    <datavue source="http://localhost:3030/products" :per-page="5" pagination="dropdown">
      <template #title>
        <h2>Products Table</h2>
      </template>
      <template #actionbar="{ checkedItems }">
        <button
          class="btn btn-danger"
          :disabled="!checkedItems.size"
          @click="deleteSelected(checkedItems)"
        >
          Delete Selected
        </button>
      </template>
      <template #head="{ sort, sortable, checkAll, isCheckedAll }">
        <tr>
          <th widht="20">
            <input type="checkbox" @change="checkAll" :checked="isCheckedAll" />
          </th>
          <th :class="sortable('name')" @click="sort('name')">Name</th>
          <th :class="sortable('category')" @click="sort('category')">
            Category
          </th>
          <th :class="sortable('price')" @click="sort('price')">Price</th>
        </tr>
      </template>
      <template #body="{ records, firstItem, isChecked, checkItem }">
        <tr v-for="(product, index) in records" :key="product.id">
          <!-- <td>{{ firstItem + index }}</td> -->
          <td>
            <input
              type="checkbox"
              :checked="isChecked(product)"
              @change="checkItem(product)"
            />
          </td>
          <td>{{ product.name }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.price }}</td>
        </tr>
      </template>
    </datavue>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
    };
  },
  methods: {
    deleteSelected(items) {
      if (confirm("Are you sure?")) {
        Array.from(items).forEach((item) => {
          const index = this.products.findIndex(
            (product) => product.id === item.id
          );
          this.products.splice(index, 1);
        });
        items.clear();
      }
    },
  },
};
</script>
