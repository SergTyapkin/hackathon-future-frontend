<style scoped lang="stylus">
@require '../styles/animations.styl'
@require '../styles/constants.styl'
@require '../styles/fonts.styl'
@require '../styles/buttons.styl'
@require '../styles/components.styl'
@require '../styles/utils.styl'


.root-list-programs
  list-no-styles()
  display flex
  flex-direction column
  align-items stretch
  gap 60px
  .program
    animation-opacity-slide-in(-50px, 0, 0.4s, 0.1s)
    flex 1
    width 100%
    cursor pointer
    display flex
    background colorEmp22
    border-radius borderRadiusXL
    trans(0.5s)
    .preview
      height 300px
      position relative
      max-width 500px
      flex 1
      img
        width 100%
        height 100%
        border-radius borderRadiusXL
        padding 1px
        overflow hidden
        object-fit cover
        trans()
      &::after
        content ''
        position absolute
        inset 0
        background linear-gradient(-70deg, colorEmp21 10%, transparent) 100% 50% / 200% 100%
        border-radius borderRadiusXL
        overflow hidden
        trans(0.5s)
        opacity 0.8
    &:hover
      background colorEmp23
      .preview
        &::after
          background-position-x 0
          opacity 0.3

    .data-container
      flex 1
      display flex
      flex-direction column
      justify-content space-between
      padding 30px
      color colorTextLight1
      .title
        font-large()
      .info
        font-small()
        color colorTextLight2
      .link
        svg-inside(20px, 0, 10px)
        font-small()
        color colorTextLight3
        padding 10px 10px 0 0
        width min-content
        white-space nowrap
        hover-effect-underline-center()
        img
          margin-bottom 3px
          opacity 0.6
</style>


<template>
  <ul class="root-list-programs">
    <li v-for="(program, idx) in list" class="program __animation-started" :style="{'--animation-index': idx}">
      <div class="preview">
        <img :src="program.previewUrl" alt="preview">
      </div>

      <div class="data-container">
        <header class="title">{{ program.title }}</header>
        <div class="info">{{ program.info }}</div>
        <a :href="program.link" class="link"><img src="../../res/icons/external_link.svg" alt="geo">На сайт</a>
        <TagsCloud class="tags" v-model="program.tags"></TagsCloud>
      </div>
    </li>
  </ul>
</template>


<script>
import TagsCloud from "~/components/TagsCloud.vue";

export default {
  components: {TagsCloud},
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
