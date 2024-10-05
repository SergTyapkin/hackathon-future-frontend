<style lang="stylus" scoped>
@require '../../styles/constants.styl'


</style>

<template>
  <input v-model="modelValue" @input="onInput"/>
</template>

<script>
export default {
  emits: ['update:modelValue'],

  props: {
    modelValue: undefined,
    uniqueName: {
      type: String,
      required: true,
    }
  },

  mounted() {
    const savedData = localStorage.getItem(this.uniqueName);
    if (savedData !== null) {
      this.$emit('update:modelValue', savedData);
    }
  },

  methods: {
    onInput() {
      localStorage.setItem(this.uniqueName, this.modelValue);
      this.$emit('update:modelValue', this.modelValue);
    }
  }
};
</script>
