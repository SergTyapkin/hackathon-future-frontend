<style lang="stylus" scoped>
@require '../styles/constants.styl'
@require '../styles/buttons.styl'
@require '../styles/fonts.styl'
@require '../styles/utils.styl'
@require '../styles/components.styl'
@require '../styles/animations.styl'


.root-main-workspace
  page-padding()

  .loading
    centered-absolute-transform()
    top headerHeight

  .section
    margin-bottom 100px
    .title
      text-transform uppercase
      font-large-extra()
      margin-bottom 20px

  .bg
    position absolute
    top 35%
    left 0
    width 100%
    z-index -1
</style>

<template>
  <div class="root-main-workspace">
    <CircleLoading v-if="loading" class="loading"></CircleLoading>

    <section class="section">
      <header class="title">Мои проекты</header>
      <ProjectsList :list="projectsList"></ProjectsList>
    </section>

    <section class="section">
      <header class="title">Новости</header>
      <FeedsList :list="feedsList"></FeedsList>
    </section>

    <div class="bg"><img src="../../res/images/worm11.svg" alt="bg"></div>
  </div>
</template>


<script>
import CircleLoading from "~/components/loaders/CircleLoading.vue";
import TagsCloud from "~/components/TagsCloud.vue";
import DragNDropLoader from "~/components/DragNDropLoader.vue";
import ProjectsList from "~/components/ProjectsList.vue";
import FeedsList from "~/components/FeedsList.vue";


export default {
  components: {FeedsList, ProjectsList, DragNDropLoader, TagsCloud, CircleLoading},

  data() {
    return {
      loading: false,

      projectsList: [],
      feedsList: [],
    }
  },

  mounted() {
    this.getProjects();
    this.getFeeds();
  },

  methods: {
    async getProjects() {
      this.loading = true;
      const {data, ok} = await this.$api.getMyProjects();
      this.loading = false;

      if (!ok) {
        this.$popups.error('Ошибка', 'Не удалось получить список проектов');
        return;
      }

      this.projectsList = data.projects;
    },

    async getFeeds() {
      this.loading = true;
      const {data, ok} = await this.$api.getAllFeeds();
      this.loading = false;

      if (!ok) {
        this.$popups.error('Ошибка', 'Не удалось получить список новостей');
        return;
      }

      this.feedsList = data.feeds;
    }
  },
}
</script>
