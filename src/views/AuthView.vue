<template>
  <div class="auth-wrapper d-flex">
    <div class="col-md-5 m-auto">
      <div class="bg-white shadow-sm">
        <!-- <div class="container my-5"> -->
        <keep-alive>
          <component :is="showForm"></component>
        </keep-alive>
        <div class="text-center py-4" v-if="showForm === 'LoginForm'">
          Don't have account?
          <a href="#" @click.prevent="showForm = 'RegisterForm'">Create one</a>
        </div>
        <div class="text-center py-4" v-else>
          Already have account?
          <a href="#" @click.prevent="showForm = 'LoginForm'">Login</a>
        </div>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from "../components/auth/LoginForm.vue";
import RegisterForm from "../components/auth/RegisterForm.vue";

export default {
  components: {
    LoginForm,
    RegisterForm,
  },
  data() {
    return {
      showForm: "LoginForm",
    };
  },
};
</script>

<style scoped>
.auth-wrapper {
  min-height: 100vh;
}
</style>
