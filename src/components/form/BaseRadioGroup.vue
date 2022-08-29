<template>
  <div class="form-group">
    <label>{{ label }}</label>
    <div>
      <base-radio
        :name="name"
        v-for="(option, index) in options"
        :class="{ 'is-invalid': getError }"
        :key="`radio-${option.value}`"
        :id="`${id}-${index}`"
        :label="option.text"
        :value="option.value"
        :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
        :inline="inline"
      ></base-radio>
      <div class="invalid-feedback d-block" v-if="getError">{{ getError }}</div>
    </div>
  </div>
</template>
<script>
function randomStr() {
  return Math.random().toString(36).substring(7);
}

export default {
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number],
      default: null,
    },
    name: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    inline: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: randomStr(),
    },
    error: {
      type: [Array, String],
      default: null,
    },
  },
  computed: {
    getError() {
      return Array.isArray(this.error) ? this.error.join(", ") : this.error;
    },
  },
};
</script>
