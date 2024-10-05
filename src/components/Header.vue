<style lang="stylus" scoped>
@require '../styles/constants.styl'
@require '../styles/fonts.styl'
@require '../styles/buttons.styl'

.root-header
  width 100%
  display flex
  position fixed
  justify-content space-between
  align-items center
  padding 0 40px
  height headerHeight
  font-large()

  .profile
    button-fill()
</style>

<template>
  <header class="root-header">
    <div class="logo">Logo</div>
    <button class="profile">Profile ></button>
  </header>
</template>

<script>
export default {
  props: {
  },

  mounted() {
  },

  methods: {
  }
};
</script>
