<template>
  <form @submit.prevent="handleSubmit">
    <AppModal title="Add New Product" :show="show"  @close="$emit('close')" large scrollable>
      <template #body>
          <div class="row">
            <div class="col-md-12">
              <base-input
                type="text"
                v-model="product.name"
                label="Name"
                :error="errors['name']"
              ></base-input>
              <div class="form-row">
                <div class="col-md-7">
                  <base-select
                    label="Category"
                    v-model="product.categoryId"
                    :options="categories"
                    placeholder="Select a category"
                    :error="errors['categoryId']"
                  ></base-select>
                </div>
                <div class="col-md-5">
                  <base-input
                    type="number"
                    label="Price"
                    v-model.number="product.price"
                    :error="errors['price']"
                  ></base-input>
                </div>
              </div>

              <base-input
                type="text"
                label="Image"
                v-model.number="product.image"
                :error="errors['image']"
              ></base-input>
              <base-textarea
                label="Description"
                rows="3"
                v-model.number="product.description"
                :error="errors['description']"
              ></base-textarea>
            </div>
          </div>
          <hr />
      </template>
      <template #footer>
        <div>
          <button class="btn btn-primary mr-2">Save</button>
          <button class="btn btn-outline-secondary" @click="$emit('close')">close</button>
        </div>
      </template>
    </AppModal>
  </form>
</template>

<script>
import axios from 'axios';
import AppModal from "../components/AppModal.vue";
export default {
  components: {
    AppModal,
  },
  props: {
    show: {
      type: Boolean,
      default:false
    }
  },
  emits: ['close'],
  methods: {
    handleSubmit() {
      this.errors = {
        name: ["The name field is required"],
        price: ["The price field is required"],
      };
      console.log(this.product);
    },
    async fetchProducts() {
      try {
        const { data } = await axios.get("http://localhost:3030/categories");
        this.categories = data.map(category => {
          return {
            value: category.id, 
            text: category.name
          }
      })
      }catch (error) {
        alert('fetch categorie error ' + error) 
      } 
    }
  },
  mounted() {
    this.fetchProducts();
  },
  data() {
    return {
      product: {
        name: "",
        price: 0,
        description: "",
        categoryId: "",
        image: "",
      },
      errors: {},
      categories: [
        { value: 1, text: "Category 1" },
        { value: 2, text: "Category 2" },
        { value: 3, text: "Category 3" },
        { value: 4, text: "Category 4" },
      ],
    };
  },
};
</script>
