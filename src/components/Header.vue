<style lang="stylus" scoped>
@require '../styles/constants.styl'
@require '../styles/fonts.styl'
@require '../styles/buttons.styl'
@require '../styles/animations.styl'
@require '../styles/components.styl'
@require '../styles/utils.styl'

.root-header
  block-emp-2(0, 8px)
  width 100%
  background colorEmp21
  //background linear-gradient(-90deg, colorEmp21 50%, colorEmp22 50%)
  display flex
  justify-content space-between
  align-items center
  padding 0 60px
  height headerHeight
  border-radius 0 0 borderRadiusXL borderRadiusXL
  color colorTextLight1
  @media({mobile})
    padding 0 20px
  //&.right
    //background linear-gradient(90deg, colorEmp21 50%, colorEmp22 50%)

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

  .group-left
  .group-right
    flex 1
    margin 0 10px
    display flex
    justify-content space-evenly
    align-items center
    opacity 1
    trans(0.3s)
    max-width 100vw
    height 100%
    //background colorEmp22
    &.closed
      flex 0
      pointer-events none
      max-width 0
      opacity 0
  .group-left
    background linear-gradient(90deg, transparent, colorEmp22)
    border-radius 0 borderRadiusL borderRadiusL 0
    border-right 2px solid colorEmp23
  .group-right
    background linear-gradient(-90deg, transparent, colorEmp22)
    border-radius borderRadiusL 0 0 borderRadiusL
    border-left 2px solid colorEmp23
</style>

<template>
  <header class="root-header" :class="{right: isRightOpened}">
    <router-link class="link logo" @click="openLeft" :to="isRightOpened ? '' : {name: 'landing'}"><img src="../../res/icons/projector.svg" alt="logo">Проектор</router-link>
    <div class="group-left" :class="{closed: isRightOpened}">
      <router-link class="link" :to="{name: 'allProjects'}">Проекты</router-link>
      <router-link class="link" :to="{name: 'allFeeds'}">Новости</router-link>
      <router-link class="link" :to="{name: 'gosPrograms'}">Гос. программы</router-link>
    </div>

    <div class="group-right" :class="{closed: !isRightOpened}">
      <router-link class="link" :to="{name: 'main'}">Мои проекты</router-link>
      <router-link class="link" :to="{name: 'myFeeds'}">Мои новости</router-link>
<!--      <router-link class="link" :to="{name: 'messenger'}">Чаты</router-link>-->
    </div>
    <router-link v-if="$store.state.user.isSignedIn" class="link profile" @click="openRight" :to="isRightOpened ? {name: 'profile'} : ''">{{ isRightOpened ? '&nbsp;&nbsp;' : '<'}}&nbsp;&nbsp;<img :src="$user.photoUrl || DEFAULT_AVATAR_URL" alt="avatar">{{ $user.firstName }} {{ isRightOpened ? '' : '' }}</router-link>
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
      isRightOpened: false,

      DEFAULT_AVATAR_URL,
    }
  },

  async mounted() {
    if (this.$store.state.user.isSignedIn) {
      this.isRightOpened = true;
    }
  },

  methods: {
    openLeft() {
      this.isRightOpened = false;
    },
    openRight() {
      if (!this.$store.state.user.isSignedIn) {
        return;
      }
      this.isRightOpened = true;
    }
  }
};
</script>
