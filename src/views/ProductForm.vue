<template>
  <div class="container py-5">
    <h1 class="border-bottom mb-4">Form Product</h1>
    <form @submit.prevent="handleSubmit">
      <div class="row">
        <div class="col-md-8">
          <base-input
            type="text"
            v-model.trim="product.name"
            label="Name"
            id="product-name"
            :error="errors['name']"
          ></base-input>
          <base-input
            type="number"
            v-model.number="product.price"
            label="Price"
            id="product-price"
            :error="errors['price']"
          ></base-input>
          <base-textarea
            rows="5"
            v-model.trim="product.description"
            label="Description"
            id="product-description"
            :error="errors['description']"
          >
          </base-textarea>
          <base-input
            type="text"
            v-model="product.image"
            label="Image"
            id="product-image"
          ></base-input>
          <base-select
            label="Category"
            v-model="product.categoryId"
            :options="categories"
            placeholder="Select a category"
            id="product-category"
            :error="errors['categoryId']"
          ></base-select>
          <base-select
            label="Vendor"
            v-model="product.vendorId"
            :options="vendors"
            placeholder="Select a vendor"
            id="product-vendor"
          ></base-select>
          <base-checkbox-group
            label="Colors"
            v-model="product.colors"
            :options="colors"
            inline
            id="product-colors"
            :error="errors['colors']"
          ></base-checkbox-group>
          <base-radio-group
            label="Publish"
            name="publication"
            id="product-publication"
            :options="publishOptions"
            v-model="product.isPublished"
            inline
            :error="errors['isPublished']"
          ></base-radio-group>
          <!-- <div class="form-group">
            <label>Publish</label>
            <div>
              <base-radio
                label="Yes"
                v-model="product.isPublished"
                :value="1"
                id="product-publication-check"
                :error="errors['isPublished']"
              ></base-radio>
            </div>
          </div> -->
          <hr />
          <div class="form-group">
            <button class="btn btn-lg btn-primary">Save</button>
          </div>
        </div>
        <div class="col-md-4">
          <pre>
            {{ product }}
          </pre>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import BaseCheckbox from "./components/form/BaseCheckbox.vue";
export default {
  components: { BaseCheckbox },
  data() {
    return {
      product: {
        name: "",
        price: null,
        description: "",
        image: "",
        categoryId: "",
        vendorId: "",
        isPublished: 1,
        colors: [],
      },
      categories: [
        { value: 1, text: "Category 1" },
        { value: 2, text: "Category 2" },
        { value: 3, text: "Category 3" },
        { value: 4, text: "Category 4" },
      ],
      vendors: [
        { value: 1, text: "Vendor 1" },
        { value: 2, text: "Vendor 2" },
        { value: 3, text: "Vendor 3" },
        { value: 4, text: "Vendor 4" },
      ],
      colors: [
        { value: 1, text: "Red" },
        { value: 2, text: "Green" },
        { value: 3, text: "Blue" },
      ],
      publishOptions: [
        { text: "Yes", value: 1 },
        { text: "No", value: 0 },
      ],
      errors: {},
    };
  },
  methods: {
    handleSubmit() {
      this.errors = {
        name: ["The name field is required"],
        price: ["The price field is required"],
        description: ["The description field is required"],
        categoryId: ["The category field is required"],
        isPublished: ["The publication field is required"],
        colors: ["The colors field is required"],
      };
      console.log(this.product);
    },
  },
};
</script>
