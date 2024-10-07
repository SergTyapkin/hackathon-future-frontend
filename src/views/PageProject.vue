<style scoped lang="stylus">
@require '../styles/constants.styl'
@require '../styles/buttons.styl'
@require '../styles/fonts.styl'
@require '../styles/utils.styl'
@require '../styles/components.styl'
@require '../styles/animations.styl'

.root-page-project
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
    overflow hidden
    .avatar-container
      position relative
      border-radius borderRadiusXL
      overflow hidden
      width 30vw
      min-width 200px
      max-width 300px
      min-height 200px
      border colorEmp21 1px solid
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
    .text-container
      flex 1
      display flex
      gap 20px
      flex-direction column
      justify-content space-between
      @media({desktop})
        max-width calc(100% - 250px)
      .container-join
        display flex
        justify-content space-between
        align-items end
        .button-join
          flex 0.6
          button-fill-accent()
          border-radius borderRadiusXL

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

  .buttons-container
    display flex
    gap 40px
    justify-content space-evenly
    .button-edit
      button-link()
    .button-create
      button-success()
    .button-save
      button-fill-accent()
    .button-cancel
      button-danger()
      background none
    .button-create
    .button-edit
    .button-save
    .button-cancel
      svg-inside(30px)
      padding 10px 30px
</style>

<template>
  <div class="root-page-project" @input="setEdited">
    <div class="flex-container">
      <div class="avatar-container">
        <CircleLoading v-if="loading"></CircleLoading>
        <DragNDropLoader v-else
                         class="image-loader"
                         @load="updateAvatar"
                         :crop-size="null"
                         :compress-size="IMAGE_MAX_RES"
                         :disabled="!isInEditMode"
        >
          <img class="preview" :src="project.previewUrl || DEFAULT_AVATAR_URL" alt="preview">
        </DragNDropLoader>
      </div>

      <div class="text-container">
        <div class="info" v-if="isInEditMode">Название проекта</div>
        <EditableDiv class="title" :editable="isInEditMode" v-model="project.title"></EditableDiv>
        <div v-if="!isInCreateMode" class="info container-join">
          ID{{ project.id }}
          <button v-if="!isInEditMode && !canEdit" class="button-join" @click="joinProject">Присоединиться!</button>
        </div>
      </div>
    </div>

    <br>
    <br>

    <div class="info">Цели проекта</div>
    <EditableDiv class="goals" v-model="project.goals" :editable="isInEditMode"></EditableDiv>

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
        <div class="info">Формат</div>
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

    <br>
    <br>
    <br>
    <br>

    <div class="buttons-container">
      <button v-if="canEdit && !isInEditMode" class="button-edit" @click="isInEditMode = true"><img src="../../res/icons/edit.svg" alt="edit">Изменить</button>

      <button v-if="canEdit && isInEditMode" class="button-cancel" @click="setNotEdited"><img src="../../res/icons/cross.svg" alt="cancel">Отменить</button>
      <button v-if="canEdit && isInEditMode" class="button-save" @click="editProject"><img src="../../res/icons/save.svg" alt="save">Сохранить</button>

      <button v-if="isInCreateMode" class="button-create" @click="createProject"><img src="../../res/icons/plus.svg" alt="plus">Создать</button>
    </div>
  </div>
</template>


<script>
import EditableDiv from "~/components/EditableDiv.vue";
import DragNDropLoader from "~/components/DragNDropLoader.vue";
import {
  DEFAULT_AVATAR_URL,
  IMAGE_MAX_RES,
  IMAGE_PROFILE_MAX_RES,
  ProjectRoles,
} from "~/utils/constants";
import CircleLoading from "~/components/loaders/CircleLoading.vue";
import TagsCloud from "~/components/TagsCloud.vue";
import RegionsSelector from "~/components/selectors/RegionsSelector.vue";
import Selector from "~/components/selectors/Selector.vue";

export default {
  components: {Selector, RegionsSelector, TagsCloud, CircleLoading, DragNDropLoader, EditableDiv},

  data() {
    return {
      loading: false,
      isInEditMode: false,

      projectId: this.$route.params.id,
      project: {
        id: '',
        title: '',
        goals: '',
        tags: [],
        region: '',
        previewUrl: '',
        format: '',
        docs: [],
      },

      IMAGE_PROFILE_MAX_RES,
      IMAGE_MAX_RES,
      DEFAULT_AVATAR_URL,
    }
  },

  computed: {
    canEdit() {
      return [ProjectRoles.activist, ProjectRoles.head].includes(this.project.myRole);
    },

    isInCreateMode() {
      return this.projectId === undefined;
    }
  },

  mounted() {
    if (!this.isInCreateMode) {
      this.getProject();
    } else {
      this.isInEditMode = true;
    }
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
      if (this.isInCreateMode) {
        this.project.previewUrl = dataURL;
        return;
      }
      this.loading = true;
      const {ok} = await this.$api.editProjectPreview(this.projectId, dataURL);
      this.loading = false;
      if (!ok) {
        this.$popups.error('Не получилось загрузить картинку', 'Неизвестная ошибка');
        return;
      }
      this.$popups.success('Успешно', 'Картинка обновлена');
      this.project.previewUrl = dataURL;
    },

    async createProject() {
      if (
        !this.project.title ||
        !this.project.goals ||
        !this.project.region ||
        !this.project.format
      ) {
        this.$popups.error('Не заполнены поля', 'Заполните поля названия, целей, региона, формата');
        return;
      }
      this.loading = true;
      const {ok} = await this.$api.createProject(this.project.title, this.project.goals, this.project.tags, this.project.region, this.project.format, this.project.docs, this.project.previewUrl);
      this.loading = false;

      if (!ok) {
        this.$popups.error('Не получилось создать поект', 'Неизвестная ошибка');
        return;
      }
      this.$router.push({name: 'myProjects'});
    },

    async editProject() {
      this.loading = true;
      const {ok} = await this.$api.editProject(this.projectId, this.project.title, this.project.goals, this.project.tags, this.project.region, this.project.format, this.project.docs);
      this.loading = false;

      if (!ok) {
        this.$popups.error('Не получилось создать поект', 'Неизвестная ошибка');
        return;
      }
      this.$router.push({name: 'myProjects'});
    },

    async joinProject() {
      this.loading = true;
      const {ok} = await this.$api.joinProject(this.projectId);
      this.loading = false;

      if (!ok) {
        this.$popups.error('Не получилось присоединиться', 'Неизвестная ошибка');
        return;
      }
      this.$router.push({name: 'allProjects'});
    },


    setEdited() {
      window.onbeforeunload = (e) => {e.preventDefault(); e.returnValue = '';};
      this.isInEditMode = true;
    },
    setNotEdited() {
      window.onbeforeunload = null;
      this.isInEditMode = false;
    },
  }
}
</script>
