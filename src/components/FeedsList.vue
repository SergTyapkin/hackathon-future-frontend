<style scoped lang="stylus">
@require '../styles/animations.styl'
@require '../styles/constants.styl'
@require '../styles/fonts.styl'
@require '../styles/buttons.styl'
@require '../styles/components.styl'
@require '../styles/utils.styl'


.root-list-feeds
  list-no-styles()
  display flex
  flex-wrap wrap
  justify-content space-between
  gap 70px
  @media({mobile})
    flex-direction column
    align-items center
    flex-wrap nowrap
  .feed
    animation-opacity-slide-in(0, -50px, 0.4s, 0.1s)
    flex 1
    display flex
    gap 30px
    block-emp-2(15px, 15px)
    padding 30px
    cursor pointer
    trans(0.6s)
    &:hover
      background colorEmp22
      padding 30px
      .preview
        img
          filter brightness(1.2)
      .container-data
        .title
          color mix(colorEmp16, white, 80%)
    .preview
      img
        width 100%
        min-width 200px
        max-width 400px
        height 100%
        object-fit cover
        border-radius borderRadiusL
        trans(0.6s)

    @media({desktop})
      &:nth-child(3n+1)
        flex-direction column
        max-width 400px
        .preview
          img
            height 180px
            max-width 400px
            min-width 200px
    @media({mobile})
      flex-direction column
      max-width 400px
      .preview
        img
          height 180px
          max-width 400px

    .container-data
      display flex
      flex-direction column
      min-width 200px
      .title
        font-large()
        font-bold()
        margin-bottom 20px
        trans(0.6s)
      .contents
        font-small()
        color colorTextLight3
        flex 1
        margin-bottom 10px
      .author
        color colorTextLight3
        hover-effect-underline-center()
        white-space nowrap
        width min-content
        svg-inside(15px, 0, 5px)
        padding-bottom 5px
</style>


<template>
  <div class="root-list-feeds">
    <router-link v-for="(feed, idx) in list" :to="{name: 'feed', params: {id: feed.id}}" class="feed __animation-started" :style="{'--animation-index': idx}">
      <div class="preview"><img :src="feed.previewUrl" alt="preview"></div>

      <div class="container-data">
        <header class="title">{{ feed.title }}</header>
        <div class="contents">{{ feed.contents.slice(0, 100) }}...</div>
        <div class="author"><img src="../../res/icons/profile.svg" alt="preview">{{ feed.authorName }}</div>
      </div>
    </router-link>
  </div>
</template>


<script>
export default {
  props: {
    list: {
      type: [],
      required: true,
    },
  },

  mounted() {
  },

  unmounted() {
  },

  methods: {
  }
}

</script>
