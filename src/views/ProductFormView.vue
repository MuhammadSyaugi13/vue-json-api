<template>
  <form @submit.prevent="handleSubmit">
    <AppModal :title="getTitle" :show="show"  @close="close()" large scrollable>
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
                v-model="product.image"
                :error="errors['image']"
              ></base-input>
              <base-textarea
                label="Description"
                rows="3"
                v-model="product.description"
                :error="errors['description']"
              ></base-textarea>
            </div>
          </div>
          <hr />
      </template>
      <template #footer>
        <div>
          <button class="btn btn-primary mr-2">Save</button>
          <button class="btn btn-outline-secondary" @click="close()">close</button>
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
    },
    id: {
      type: [String, Number],
      default: null
    }
  },
  emits: ['close', 'created', 'updated'],
  methods: {
    async create() {
      try {
        const {data:product} = await axios.post("http://localhost:3030/products", this.product)
        this.$emit('created', product)
        this.$emit('close')
      } catch (error) {
        if (error.response && error.response.status == 422){
          this.errors = error.response.data.errors
        }else {
          console.error(error)
        }

      }
    },
    async update() {
      try {
        const {data:product} = await axios.put(`http://localhost:3030/products/${this.id}`, this.product)
        this.$emit('updated', product)
        this.$emit('close')
      } catch (error) {
        if (error.response && error.response.status == 422){
          this.errors = error.response.data.errors
        }else {
          console.error(error)
        }

      }
    },
    handleSubmit () {
      if (this.id) {
        this.update()
      }else {
        this.create()
      }
    },
    async fetchCategories() {
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
    },
    async fetchProducts(id) {
      try {
          const { data: product } = await axios.get(`http://localhost:3030/products/${id}`)
          this.product = product
      } catch (error) {
        console.error(error)
      }
    },
    close() {
      this.product = initialData()
      this.$emit('close')
    }
  },
  computed: {
    getTitle() {
      return this.id ? "Edit Product" : "Add New Product"
    }
  },
  mounted() {
    this.fetchCategories();
  },
  watch: {
    id (value) {
      if (value) {
        const data = this.fetchProducts(value);        
        console.log('product', this.product)
      }

    }
  },
  data() {
    return {
      product: initialData(),
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

function initialData() {
  return {
        name: "",
        price: 0,
        description: "",
        categoryId: "",
        image: "",
      }
}
</script>
