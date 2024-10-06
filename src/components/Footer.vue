<style lang="stylus" scoped>
@require '../styles/constants.styl'
@require '../styles/utils.styl'
@require '../styles/components.styl'
@require '../styles/fonts.styl'


.root-footer
  height calc(100vw / 1400 * 1015)
  width 100vw
  position relative
  .bg
    display block
    width 100%
  .text-container
    position absolute
    bottom 0
    left 0
    right 0
    font-small()
    color colorTextLight1
    padding 0 60px
    @media({mobile})
      padding 0 30px
    .columns
      display flex
      justify-content space-between
      gap 20px
      height 18vw
      align-items start
      .logo
        centered-flex-container()
        svg-inside(40px, 0, 10px)
        text-transform uppercase
        font-special-large-extra()
        @media({mobile})
          font-special-large()
        font-bold()
      .column
        margin-top 20px
        display flex
        flex-direction column
        gap 20px
        @media({mobile})
          gap 3px
          margin-top -20px
        .accent
          color colorTextEmp
        &.contacts
          @media({mobile})
            margin-top -100px
          gap 10px
        .text-big
          font-large()
          @media({mobile})
            font-medium()
    .copyright
      border-top 1px solid colorTextLight1
      padding 20px 0
      font-small-extra()
      @media({mobile})
        padding 10px 0
</style>

<template>
  <footer class="root-footer">
    <img src="../../res/images/endingWorm.svg" alt="bg" class="bg">

    <div class="text-container">
      <div class="columns">
        <div class="logo"><img src="../../res/icons/projector.svg" alt="logo">Проектор</div>
        <div class="column">
          <router-link :to="{name: 'profile'}">Проекты</router-link>
          <router-link :to="{name: 'profile'}">Статьи</router-link>
          <router-link :to="{name: 'profile'}">Мероприятия</router-link>
        </div>
        <div class="column">
          <router-link :to="{name: 'profile'}">Эксперты</router-link>
          <router-link :to="{name: 'profile'}">Гос. Проекты</router-link>
        </div>
        <div class="column contacts">
          <div class="">Служба технической поддержки</div>
          <div class="accent">support@projector.ru</div>
          <div class="text-big">8-(916)-093-28-60</div>
          <div class="text-big">8-(800)-555-35-35</div>
        </div>
      </div>
      <div class="copyright">&copy; Команда №5 на хакатоне "Вызовы Будущего"</div>
    </div>
  </footer>
</template>

<script>
export default {
};
</script>
