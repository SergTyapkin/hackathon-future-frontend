<style scoped lang="stylus">
@require '../styles/animations.styl'
@require '../styles/constants.styl'
@require '../styles/fonts.styl'
@require '../styles/buttons.styl'
@require '../styles/components.styl'
@require '../styles/utils.styl'


.root-list-projects
  list-no-styles()
  display flex
  justify-content space-evenly
  align-items stretch
  flex-wrap wrap
  gap 60px
  @media({mobile})
    gap 30px
  .project
    animation-opacity-slide-in(0, -50px, 0.4s, 0.1s)
    flex 1
    width 100%
    max-width 350px
    min-width 280px
    cursor pointer
    display flex
    flex-direction column
    .preview
      block-emp-1(12px, 12px)
      padding 0
      height 200px
      margin-bottom 35px
      img
        width 100%
        height 100%
        border-radius borderRadiusXL
        overflow hidden
        padding 5px
        object-fit cover
        trans()
    &:hover
      .preview
        block-emp-2(20px, 20px)
        padding 0
        img
          filter brightness(1.2)

    .data-container
      flex 1
      display flex
      flex-direction column
      justify-content space-between
      .title
        font-large()
      .goals
        font-small()
        color colorText5
      .place
        centered-flex-container()
        justify-content start
        svg-inside(20px, 0, 10px)
        font-small()
        color colorText5
        padding 10px 0
</style>


<template>
  <ul class="root-list-projects">
    <router-link v-for="(project, idx) in list" :to="{name: 'project', params: {id: project.id}}" class="project __animation-started" :style="{'--animation-index': idx}">
      <div class="preview"><img :src="project.previewUrl" alt="preview"></div>

      <div class="data-container">
        <header class="title">{{ project.title }}</header>
        <div class="goals">{{ project.goals }}</div>
        <div class="place"><img src="../../res/icons/place.svg" alt="geo">{{ project.region }} | {{ project.format }}</div>
        <TagsCloud class="tags" v-model="project.tags"></TagsCloud>
      </div>
    </router-link>
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
