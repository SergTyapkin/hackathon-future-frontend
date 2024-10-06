<style lang="stylus" scoped>
@require '../styles/constants.styl'
@require '../styles/fonts.styl'
@require '../styles/buttons.styl'
@require '../styles/animations.styl'
@require '../styles/components.styl'

.root-header
  block-emp-2(0, 8px)
  width 100%
  background colorEmp21
  display flex
  justify-content space-between
  align-items center
  padding 0 60px
  height headerHeight
  border-radius 0 0 borderRadiusXL borderRadiusXL
  color colorTextLight1
  @media({mobile})
    padding 0 20px

  .link
    button-no-styles()
    font-medium()
    color colorTextLight1
    padding 0 5px
    hover-effect-opacity()
    hover-effect-underline-center()
    @media({mobile})
      font-small()
      word-break break-all
  .logo
    font-special-large()
    font-bold()
    text-transform uppercase
    svg-inside(40px, -10px, 10px)
    centered-flex-container()
    @media({mobile})
      font-size 0
      > img
        margin 0
  .profile
    button-fill()
    font-medium()
    padding 10px 20px
    @media({mobile})
      font-small()
      padding 5px
    img
      width 25px
      height 25px
      border-radius 9999px
      border 2px solid colorEmp21
      margin-right 10px
      background colorEmp21
      @media({mobile})
        max-width 0
        border none
</style>

<template>
  <header class="root-header">
    <router-link class="link logo" :to="{name: 'default'}"><img src="../../res/icons/projector.svg" alt="logo">Проектор</router-link>
    <router-link class="link" :to="{name: 'allProjects'}">Проекты</router-link>
    <router-link class="link" :to="{name: 'allFeeds'}">Новости</router-link>
    <router-link class="link" :to="{name: 'gosPrograms'}">Гос. программы</router-link>

    <router-link v-if="$store.state.user.isSignedIn" class="link profile" :to="{name: 'profile'}"><img :src="$user.photoUrl || DEFAULT_AVATAR_URL" alt="avatar">{{ $user.midName }} ></router-link>
    <router-link v-else class="link profile" :to="{name: 'login'}">Войти ></router-link>
  </header>
</template>

<script>
import {DEFAULT_AVATAR_URL} from "~/utils/constants";

export default {
  props: {
  },

  data() {
    return {
      DEFAULT_AVATAR_URL,
    }
  },

  mounted() {
  },

  methods: {
  }
};
</script>
