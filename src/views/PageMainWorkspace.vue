<style lang="stylus" scoped>
@require '../styles/constants.styl'
@require '../styles/buttons.styl'
@require '../styles/fonts.styl'
@require '../styles/utils.styl'
@require '../styles/components.styl'
@require '../styles/animations.styl'


.root-main-workspace
  padding 80px

</style>

<template>
  <div class="root-main-workspace">
    <ProjectsList :list="projectsList"></ProjectsList>
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
    }
  },

  async mounted() {
  },

  methods: {
  },
}
</script>
