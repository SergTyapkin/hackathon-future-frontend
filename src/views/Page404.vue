<style lang="stylus" scoped>
@require '../styles/constants.styl'
@require '../styles/fonts.styl'

.root-404
  page-padding()
  width 100%

  .form
    margin 20px auto
    max-width 600px
    background-color colorBg
    border-radius borderRadiusM
    padding 20px
    padding-top 10px
    text-align center
    color colorText1
    .title
      font-large()
      margin-bottom 10px
    .info
      font-medium()
      margin-bottom 15px
</style>

<template>
  <div class="root-404">
    <div class="form">
      <div class="title">404 Страница не найдена</div>
      <div class="info">Запрошенной страницы не существует</div>
      <router-link :to="{name: 'default'}"></router-link>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

