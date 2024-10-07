<style scoped lang="stylus">
@require '../../styles/animations.styl'
@require '../../styles/constants.styl'
@require '../../styles/fonts.styl'
@require '../../styles/buttons.styl'
@require '../../styles/components.styl'
@require '../../styles/utils.styl'


select
  input()
  background none
  border none
  padding 10px 20px
  box-shadow 0 1px 3px rgba(0, 0, 0, 0.1)
  font-size inherit
  margin 0
  border-radius 999999px
  cursor pointer
  text-overflow ellipsis
  white-space nowrap
  width 100%
  min-width 100px
  trans()
  &[disabled]
    user-select text
    cursor text
    appearance none
</style>


<template>
  <select :name="name" v-model="modelValue" @input="(e) => updateModelValue(e.target.value)" :disabled="!editable">
    <option disabled selected value></option>
    <slot></slot>
  </select>
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
    name: String
  },

  data() {
    return {}
  },

  mounted() {
  },

  methods: {
    updateModelValue(val) {
      this.$emit('update:modelValue', val);
    },
  }
}
</script>
