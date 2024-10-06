<style lang="stylus" scoped>
@require '../styles/constants.styl'
@require '../styles/fonts.styl'
@require '../styles/buttons.styl'
@require '../styles/animations.styl'
@require '../styles/components.styl'

.root-editable
  input()
  trans()
  &:not([contenteditablee])
    border none
    padding 0
</style>

<template>
  <div class="root-editable" :contenteditable="editable" @input.capture="(e) => updateModelValue(e.target.innerText)" @keydown.enter="onEnter">{{ modelValue }}</div>
</template>

<script>
export default {
  emits: ['update:modelValue'],

  props: {
    editable: Boolean,
    modelValue: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
    }
  },

  mounted() {
  },

  methods: {
    onEnter(e) {
      e.target.blur();
    },

    updateModelValue(val) {
      this.$emit('update:modelValue', val);
    },
  }
};
</script>
