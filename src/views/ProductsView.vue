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
          <th width="150">Action</th>
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
          <td>
            <a href="" class="btn btn-sm btn-info" @click.prevent="editId = product.id, showForm=true">Edit</a>
            <a href="" class="btn btn-sm btn-danger ml-2" @click.prevent="deleteRow(product)">Delete</a>
          </td>
        </tr>
      </template>
    </datavue>
    <product-form-view :show="showForm" @created="addRecord($event)" @updated="updateRecord($event)" @close="showForm=false, editId=null" :id="editId"></product-form-view>
    <app-notify :message="flashMessage" :open="showFlash" @close="showFlash = false"></app-notify> 
    <!-- <app-modal title="Add New Product" :show="showForm"  @close="showForm=false" large scrollable> -->
  </div>
</template>

<script>
import ProductFormView from "./ProductFormView.vue";
import { getProducts, deleteProduct } from "../apis/products-api";

export default {
  components: {
    ProductFormView
  },
  data() {
    return {
      products: [],
      showForm: false,
      showFlash: false,
      flashMessage: "",
      editId: null
    };
  },
  mounted () {
    this.fetchProducts()
  },
  methods: {
    addRecord(record){
      this.products.push(record)
      this.flashMessage = "Product has been saved"
      this.showFlash = true
    },
    updateRecord(record) {
      const index = this.products.findIndex((item) => item.id === record.id)
      this.products.splice(index, 1, record)
      this.flashMessage = "Product has been updated"
      this.showFlash = true
    },
    async deleteRow(item) {
      if (confirm('are you sure?')) {
        this.deleteOne(item);

        this.flashMessage = "Product has been removed"
        this.showFlash = true
      }
    },
    async fetchProducts() {
      try {
        // const { data } = await axios.get("http://localhost:3030/products")
        const { data } = await getProducts();
        this.products = data
      } catch (error) {
        console.error(`fecthProduct error : ${error}`)
      }
    },
    async deleteOne(item) {
      try {
        // const response = await axios.delete(`http://localhost:3030/products/${item.id}`)
        const response = await deleteProduct(item.id)
        if (response.status == 200 || response.status == 204) {
          const index = this.products.findIndex( (product) => product.id === item.id );
          this.products.splice(index, 1);
        }
      } catch (error) {
        console.error(error)
      }
    },
    deleteSelected(items) {
      if (confirm("Are you sure?")) {
        Array.from(items).forEach((item) => {
          this.deleteOne(item)
        });
        items.clear();

        this.flashMessage = "Products selected has been removed"
        this.showFlash = true
      }
    },
  },
};
</script>
