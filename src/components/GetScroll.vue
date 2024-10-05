<style scoped lang="stylus">

</style>


<template>
</template>


<script>
export default {
  emits: ['update:modelValue'],

  props: {
    modelValue: {
      type: Number,
      required: true,
    },
    targetElement: {
      type: HTMLElement,
      default: document.body,
    }
  },

  mounted() {
    this.targetElement.addEventListener('scroll', this.onScroll);
  },

  unmounted() {
    this.targetElement.removeEventListener('scroll', this.onScroll);
  },

  methods: {
    onScroll(e) {
      this.updateModelValue(this.targetElement.scrollTop);
    },

    updateModelValue(val) {
      this.$emit('update:modelValue', val);
    }
  }
}

</script>
