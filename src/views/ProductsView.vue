<template>
  <div class="container py-5">
    <datavue :source="products" :per-page="5" pagination="dropdown">
      <template #title>
        <h2>Products Table</h2>
      </template>
      <template #actionbar="{ checkedItems }">
        <button class="btn btn-outline-primary mr-2" @click="showForm=true">
          Add new
        </button>
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
          <th width="20">
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
    <product-form-view :show="showForm" @close="showForm=false"></product-form-view> 
    <!-- <app-modal title="Add New Product" :show="showForm"  @close="showForm=false" large scrollable> -->
  </div>
</template>

<script>
import axios from "axios";
import ProductFormView from "./ProductFormView.vue";

export default {
  components: {
    ProductFormView
  },
  data() {
    return {
      products: [],
      showForm: false
    };
  },
  mounted () {
    this.fetchProducts()
  },
  methods: {
    async fetchProducts() {
      try {
        const { data } = await axios.get("http://localhost:3030/products")
        this.products = data
      } catch (error) {
        console.error(`fecthProduct error : ${error}`)
      }
    },
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
