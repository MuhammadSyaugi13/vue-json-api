<template>
  <div v-if="show">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div :class="modalClasses">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ title }}</h5>
              <button type="button" class="close" @click="close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <slot name="body" />
            </div>
            <div class="modal-footer" v-if="$slots.footer">
              <slot name="footer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    large: {
      type: Boolean,
      default: false,
    },
    scrollable: {
      type: Boolean,
      default: false,
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["close"],
  methods: {
    close() {
      this.$emit("close");
    },
    handleKeydown(e) {
      if (this.show && e.keyCode == 27) {
        this.close();
      }
    },
  },

  computed: {
    modalClasses() {
      return {
        "modal-dialog": true,
        "modal-lg": this.large,
        "modal-dialog-scrollable": this.scrollable,
      };
    },
  },

  mounted() {
    document.addEventListener("keydown", this.handleKeydown);
  },

  unmounted() {
    document.removeEventListener("keydown", this.handleKeydown);
  },
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
</style>
