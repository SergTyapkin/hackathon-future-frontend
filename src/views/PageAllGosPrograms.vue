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
    <header class="title">Государственные программы</header>

    <GosProgramsList :list="programsList"></GosProgramsList>
  </div>
</template>


<script>
import ProjectsList from "~/components/ProjectsList.vue";
import GosProgramsList from "~/components/GosProgramsList.vue";

export default {
  components: {GosProgramsList, ProjectsList},

  data() {
    return {
      loading: [],

      programsList: [],
    }
  },

  mounted() {
    this.getGosPrograms();
  },

  methods: {
    async getGosPrograms() {
      this.loading = true;
      const {data, ok} = await this.$api.getAllGosPrograms();
      this.loading = false;

      if (!ok) {
        this.$popups.error('Ошибка', 'Не удалось получить список проектов');
        return;
      }

      this.programsList = data.programs;
    },
  }
}
</script>
