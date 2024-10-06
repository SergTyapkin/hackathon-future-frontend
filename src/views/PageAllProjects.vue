<style scoped lang="stylus">
@require '../styles/constants.styl'
@require '../styles/buttons.styl'
@require '../styles/fonts.styl'
@require '../styles/utils.styl'
@require '../styles/components.styl'
@require '../styles/animations.styl'

.root-page-all-projects
  page-padding()

  .title
    font-large-extra()
    text-transform uppercase
    margin-bottom 20px
</style>

<template>
  <div class="root-page-all-projects">
    <header class="title">Все проекты активистов</header>

    <ProjectsList :list="projectsList"></ProjectsList>
  </div>
</template>


<script>
import ProjectsList from "~/components/ProjectsList.vue";

export default {
  components: {ProjectsList},

  data() {
    return {
      loading: [],

      projectsList: [],
    }
  },

  mounted() {
    this.getProjects();
  },

  methods: {
    async getProjects() {
      this.loading = true;
      const {data, ok} = await this.$api.getAllProjects();
      this.loading = false;

      if (!ok) {
        this.$popups.error('Ошибка', 'Не удалось получить список проектов');
        return;
      }

      this.projectsList = data.projects;
    },
  }
}
</script>
