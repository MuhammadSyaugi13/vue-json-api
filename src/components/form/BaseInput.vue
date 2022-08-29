<template>
  <div class="form-group">
    <label v-bind="labelFor">{{ label }}</label>
    <input
      class="form-control"
      :class="{ 'is-invalid': getError }"
      v-bind="$attrs"
      :value="modelValue"
      @input="handleInput"
    />
    <div class="invalid-feedback" v-if="getError">{{ getError }}</div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: [String, Number],
      default: null,
    },
    modelModifiers: {
      default: () => ({}),
    },
    error: {
      type: [Array, String],
      default: null,
    },
  },
  methods: {
    handleInput(event) {
      let value = event.target.value;
      if (this.modelModifiers.number) {
        value = Number(value);
      }
      if (this.modelModifiers.trim) {
        value = value.trim();
      }
      this.$emit("update:modelValue", value);
    },
  },
  computed: {
    labelFor() {
      return this.$attrs.id ? { for: this.$attrs.id } : {};
    },
    getError() {
      return Array.isArray(this.error) ? this.error.join(", ") : this.error;
    },
  },
};
</script>
