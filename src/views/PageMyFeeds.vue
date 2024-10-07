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
    <header class="title">Мои новости</header>

    <FeedsList :list="feedsList"></FeedsList>
  </div>
</template>


<script>
import FeedsList from "~/components/FeedsList.vue";

export default {
  components: {FeedsList},

  data() {
    return {
      loading: [],

      feedsList: [],
    }
  },

  mounted() {
    this.getFeeds();
  },

  methods: {
    async getFeeds() {
      this.loading = true;
      const {data, ok} = await this.$api.getMyFeeds();
      this.loading = false;

      if (!ok) {
        this.$popups.error('Ошибка', 'Не удалось получить список проектов');
        return;
      }

      this.feedsList = data.feeds;
    },
  }
}
</script>
