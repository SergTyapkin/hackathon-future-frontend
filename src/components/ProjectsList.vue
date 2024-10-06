<style scoped lang="stylus">
@require '../styles/animations.styl'
@require '../styles/constants.styl'
@require '../styles/fonts.styl'
@require '../styles/buttons.styl'


.root-list-projects
  list-no-styles()
  .project
    display block
</style>


<template>
  <ul class="root-list-projects">
    <li v-for="project in list" class="project">

    </li>
  </ul>
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
