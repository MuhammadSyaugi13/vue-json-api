<template>
  <div class="alert" :class="alertType" role="alert" v-show="open">
    {{ message }} 
    <button
      type="button"
      class="close"
      data-dismiss="alert"
      aria-label="Close"
      @click="hide"
    >
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "primary",
      validator: function (value) {
        return (
          ["success", "primary", "danger", "warning"].indexOf(value) !== -1
        );
      },
    },
    position: {
      type: String,
      default: "br",
      validator: function (value) {
        return ["tl", "bl", "tr", "br"].indexOf(value) !== -1;
      },
    },
    open: {
      type: Boolean,
      default: false,
    },
    timeout: {
      type: Number,
      default: 3000,
    },
  },
  emits: ["close"],
  watch: {
    open(value) {
      if (value) {
        if (this.timer) {
          clearTimeout(this.timer);
        }

        this.timer = setTimeout(() => {
          this.hide();
        }, 3000);
      }
    },
  },
  data() {
    return {
      timer: null,
    };
  },
  methods: {
    hide() {
      this.$emit("close");
    },
  },
  computed: {
    alertType() {
      return [`alert-${this.type}`, `alert-${this.position}`];
    },
  },
};
</script>

<style scoped>
.alert-tl {
  position: fixed;
  left: 30px;
  top: 10px;
}
.alert-bl {
  position: fixed;
  left: 30px;
  bottom: 10px;
}
.alert-tr {
  position: fixed;
  right: 30px;
  top: 10px;
}
.alert-br {
  position: fixed;
  right: 30px;
  bottom: 10px;
}
</style>
