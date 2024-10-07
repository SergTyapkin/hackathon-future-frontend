<style lang="stylus" scoped>
@require '../styles/constants.styl'
@require '../styles/utils.styl'
@require '../styles/fonts.styl'
@require '../styles/animations.styl'


float-button-height = 40px
image-width = 30px
.float-button
  cursor pointer
  overflow hidden
  @media ({mobile})
    right 20px
  height float-button-height
  min-width float-button-height
  border-radius 99999px
  padding 5px
  border colorEmp21 2px solid

  .fields
    height 100%
    display flex
    align-items center
    text-align center
    flex-direction row
    transition all 0.2s ease
    .image
      trans()
      width image-width
      height image-width
      opacity 0.8
      margin 0
    .hover-text
      font-medium()
      color colorEmp21
      transition all 0.2s ease
      pointer-events none
      white-space nowrap
      width 100%
      max-width 0
      opacity 0
.float-button:hover
  .hover-text
    max-width 100vw
    opacity 1
    padding-right 10px
  .image
    transform scale(1.1)
    opacity 1
    margin-right 10px



@media ({mobile})
  .float-button
    transition opacity 0.3s ease, right 0.3s ease !important
</style>

<template>
  <div class="float-button">
    <router-link v-if="to" class="fields" :to="to">
      <div class="image">
        <slot></slot>
      </div>
      <div class="hover-text">{{ title }}</div>
    </router-link>

    <div class="fields" v-else>
      <div class="image">
        <slot></slot>
      </div>
      <div class="hover-text">{{ title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    to: Object,
    green: Boolean,
  }
};
</script>
