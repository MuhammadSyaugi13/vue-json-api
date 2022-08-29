<template>
  <h1 class="text-center p-4 border-bottom text-uppercase">Login Form</h1>

  <div class="px-4 pt-4">
    <form @submit.prevent="handleSubmit">
      <base-input
        label="Email"
        v-model="user.email"
        :error="errors['email']"
      ></base-input>
      <base-input
        label="Password"
        v-model="user.password"
        type="password"
        :error="errors['password']"
      ></base-input>
      <div class="mt-4 mb-2">
        <button class="btn btn-block btn-primary">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      errors: {},
    };
  },
  methods: {
    handleSubmit() {
      this.errors = {
        email: ["The email field is required"],
        password: ["The password field is required"],
      };
    },
  },
};
</script>
