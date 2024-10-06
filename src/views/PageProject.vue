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
    width 100%
  .info
    font-medium()
    color colorTextLight3


  .flex-container
    display flex
    gap 30px
    @media({mobile})
      flex-direction column

  .flex-container
    .avatar-container
      position relative
      border-radius borderRadiusXL
      overflow hidden
      width 30vw
      min-width 200px
      max-width 300px
      min-height 200px
      @media({mobile})
        max-width unset
        min-height unset
        width 100%
        height 100%
      .image-loader
        height 100%
        width 100%
        .preview
          height 100%
          width 100%
          object-fit cover
          display block

  .flex-container
    .region
    .format
      flex 1
      max-width 300px

  .goals
    font-medium()
    block-emp-1-bg()
    color colorText1
    padding 20px

  .selector
    min-width 200px
</style>

<template>
  <div class="root-page-all-projects" @input="setEdited">
    <div class="flex-container">
      <div class="avatar-container">
        <CircleLoading v-if="loading"></CircleLoading>
        <DragNDropLoader v-else class="image-loader"
                         @load="updateAvatar"
                         :crop-size="null"
                         :compress-size="IMAGE_MAX_RES"
        >
          <img class="preview" :src="project.previewUrl || DEFAULT_AVATAR_URL" alt="preview">
        </DragNDropLoader>
      </div>

      <div class="text-container">
        <div class="info" v-if="isMy">Название проекта</div>
        <EditableDiv class="title" :editable="isInEditMode" v-model="project.title"></EditableDiv>
        <div class="info">ID{{ project.id }}</div>
      </div>
    </div>

    <br>

    <div class="info">Цели проекта</div>
    <EditableDiv class="goals" v-model="project.goals"></EditableDiv>

    <br>
    <br>
    <br>

    <div class="info">Тэги для поиска</div>
    <TagsCloud v-model="project.tags" :can-all="isInEditMode"></TagsCloud>

    <br>
    <br>


    <div class="flex-container">
      <div class="region">
        <div class="info">Регион</div>
        <RegionsSelector class="selector" :editable="isInEditMode" v-model="project.region"></RegionsSelector>
      </div>

      <div class="format">
        <div class="info">Формат работы</div>
        <Selector class="selector" :editable="isInEditMode" v-model="project.format">
          <option value="Очно">Очно</option>
          <option value="Онлайн">Онлайн</option>
          <option value="Гибрид">Гибрид</option>
          <option value="Другое">Другое</option>
        </Selector>
      </div>
    </div>

    <br>
    <br>

    <div class="info">Ссылки на документы</div>
    <TagsCloud v-model="project.docs" :can-all="isInEditMode" :limit="20" links></TagsCloud>
  </div>
</template>


<script>
import EditableDiv from "~/components/EditableDiv.vue";
import DragNDropLoader from "~/components/DragNDropLoader.vue";
import {DEFAULT_AVATAR_URL, IMAGE_MAX_RES, IMAGE_PROFILE_MAX_RES} from "~/utils/constants";
import CircleLoading from "~/components/loaders/CircleLoading.vue";
import TagsCloud from "~/components/TagsCloud.vue";
import RegionsSelector from "~/components/selectors/RegionsSelector.vue";
import Selector from "~/components/selectors/Selector.vue";

export default {
  components: {Selector, RegionsSelector, TagsCloud, CircleLoading, DragNDropLoader, EditableDiv},

  data() {
    return {
      loading: [],
      isInEditMode: false,

      isMy: true,

      projectId: this.$route.params.id,
      project: {},

      IMAGE_PROFILE_MAX_RES,
      IMAGE_MAX_RES,
      DEFAULT_AVATAR_URL,
    }
  },

  mounted() {
    if (this.projectId === undefined) {
      this.$popups.error('Ошибка', 'id проекта не передано в url');
      this.$router.replace({name: 'default'});
      return;
    }

    this.getProject();
  },

  methods: {
    async getProject() {
      this.loading = true;
      const {data, ok} = await this.$api.getProjectById();
      this.loading = false;

      if (!ok) {
        this.$popups.error('Ошибка', 'Не удалось получить список проектов');
        return;
      }

      this.project = data;
    },
    async updateAvatar(dataURL) {
      this.loading = true;
      const {ok} = await this.$api.editProjectPreview(this.projectId, dataURL);
      this.loading = false;
      if (!ok) {
        this.$popups.error('Не получилось загрузить картинку', 'Неизвестная ошибка');
        return;
      }

      this.project.previewUrl = dataURL;
    },

    setEdited() {
      window.onbeforeunload = (e) => {e.preventDefault(); e.returnValue = '';};
      this.isInEditData = true;
    },
    setNotEdited() {
      this.copyFieldsFrom$User();
      window.onbeforeunload = null;
      this.isInEditData = false;
    },
  }
}
</script>
