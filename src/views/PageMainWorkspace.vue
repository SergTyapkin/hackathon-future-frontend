<style lang="stylus" scoped>
@require '../styles/constants.styl'
@require '../styles/buttons.styl'
@require '../styles/fonts.styl'
@require '../styles/utils.styl'
@require '../styles/components.styl'
@require '../styles/animations.styl'


.root-main-workspace
  padding 80px

  .title
    text-transform uppercase
    font-large-extra()
</style>

<template>
  <div class="root-main-workspace">
    <section>
      <header class="title">Мои проекты</header>
      <ProjectsList :list="projectsList"></ProjectsList>
    </section>

    <section>
      <header class="title">Новости</header>
<!--      <NewsList :list="newsList"></NewsList>-->
    </section>

    <div class="bg"></div>
  </div>
</template>


<script>
import CircleLoading from "~/components/loaders/CircleLoading.vue";
import TagsCloud from "~/components/TagsCloud.vue";
import DragNDropLoader from "~/components/DragNDropLoader.vue";
import ProjectsList from "~/components/ProjectsList.vue";


export default {
  components: {ProjectsList, DragNDropLoader, TagsCloud, CircleLoading},

  data() {
    return {
      loading: false,

      projectsList: [],
      newsList: [],
    }
  },

  async mounted() {
  },

  methods: {
  },
}
</script>
