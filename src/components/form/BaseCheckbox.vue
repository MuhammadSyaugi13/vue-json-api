<template>
  <div :class="classes">
    <input
      class="form-check-input"
      :class="{ 'is-invalid': getError }"
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
      v-bind="$attrs"
    />
    <label class="form-check-label" v-bind="labelFor">{{ label }}</label>
    <div class="invalid-feedback" v-if="getError">{{ getError }}</div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      required: true,
    },
    inline: {
      type: Boolean,
      default: false,
    },
    error: {
      type: [Array, String],
      default: null,
    },
  },
  computed: {
    classes() {
      return ["form-check", this.inline ? "form-check-inline" : ""];
    },
    labelFor() {
      return this.$attrs.id ? { for: this.$attrs.id } : {};
    },
    getError() {
      return Array.isArray(this.error) ? this.error.join(", ") : this.error;
    },
  },
};
</script>
