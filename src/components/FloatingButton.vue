<style lang="stylus" scoped>
@require '../styles/constants.styl'
@require '../styles/utils.styl'

float-button-height = 50px
image-width = 30px
padding = 5px
.float-button
  z-index 10
  cursor pointer
  overflow hidden
  position fixed
  bottom 30px
  right 30px
  @media ({mobile})
    right 20px
  height float-button-height
  min-width float-button-height
  border-radius((float-button-height / 2))
  padding padding
  padding-right ((float-button-height - image-width) / 2)
  background empColor2_2
  box-shadow 3px 3px 5px colorShadow

  .fields
    height 100%
    display flex
    align-items center
    text-align center
    flex-direction row
    justify-content flex-end
    transition all 0.2s ease
    .image
      transition all 0.2s ease
      width image-width
      height image-width
      opacity 0.8
    .hover-text
      transition all 0.2s ease
      overflow hidden
      width 0
      pointer-events none
      opacity 0
.float-button:hover
  box-shadow 5px 5px 8px colorShadow
  .hover-text
    width 120px
    opacity 1
  .image
    transform scale(1.1)
    opacity 1

.float-button.green
  background mix(colorSuccess, black, 70%)


@media ({mobile})
  .float-button
    transition opacity 0.3s ease, right 0.3s ease !important
</style>

<template>
  <div class="float-button " :class="{green}">
    <router-link class="fields" :to="to" v-if="to">
      <span class="hover-text">{{ title }}</span>
      <span class="image">
        <slot></slot>
      </span>
    </router-link>

    <div class="fields" v-else>
      <span class="hover-text">{{ title }}</span>
      <span class="image">
        <slot></slot>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    to: String,
    green: Boolean,
  }
};
</script>
