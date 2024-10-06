<style lang="stylus" scoped>
@require '../styles/animations.styl'
@require '../styles/constants.styl'
@require '../styles/fonts.styl'
@require '../styles/buttons.styl'

.root-menu
  position fixed
  top 0
  left 0
  height 100%
  width unquote('min(30vw, 300px)')
  @media({mobile})
    width 100vw
  background colorEmp21
  color colorTextEmp
  z-index 9999
  padding 50px
  .title
    font-large-extra()
  .links-container
    height 100%
    display flex
    flex-direction column
    justify-content center
    gap 8%
    font-medium()
    .link
      hover-effect-opacity()
      hover-effect-underline-left(colorEmp11)
</style>

<template>
  <aside class="root-menu">
    <header class="title">Меню</header>
    <div class="links-container">
      <router-link to="" class="link">Профиль</router-link>
      <router-link to="" class="link">Проекты</router-link>
      <router-link to="" class="link">Новости</router-link>
      <router-link to="" class="link">Партнёры</router-link>
      <router-link to="" class="link">Гос. программы</router-link>
    </div>
  </aside>
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
