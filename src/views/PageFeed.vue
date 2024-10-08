<style scoped lang="stylus">
@require '../styles/constants.styl'
@require '../styles/buttons.styl'
@require '../styles/fonts.styl'
@require '../styles/utils.styl'
@require '../styles/components.styl'
@require '../styles/animations.styl'

.root-page-feed
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
      @media({desktop})
        max-width calc(100% - 250px)

  .flex-container
    .region
    .format
      flex 1
      max-width 300px

  .contents
    font-medium()
    block-emp-1-bg()
    color colorText1
    //padding 2px 20px
    padding 20px
    --color colorEmp21

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

<style lang="stylus">
@require '../styles/fonts.styl'

.root-page-feed
  textarea
    font-medium()
</style>

<template>
  <div class="root-page-feed" @input="setEdited">
    <div class="flex-container">
      <div class="avatar-container">
        <CircleLoading v-if="loading"></CircleLoading>
        <DragNDropLoader v-else
                         class="image-loader"
                         @load="updateAvatar"
                         :crop-to-square="false"
                         :compress-size="IMAGE_MAX_RES"
                         :disabled="!isInEditMode"
        >
          <img class="preview" :src="feed.previewUrl || DEFAULT_AVATAR_URL" alt="preview">
        </DragNDropLoader>
      </div>

      <div class="text-container">
        <div class="info" v-if="isInEditMode">Название статьи</div>
        <EditableDiv class="title" v-model="feed.title" :editable="isInEditMode"></EditableDiv>
        <div v-if="!isInCreateMode" class="info">ID{{ feed.id }}</div>
      </div>
    </div>

    <br>

    <div class="info">Основной текст</div>
<!--    <MarkdownRedactor v-if="isInEditMode" class="contents" v-model="feed.contents"></MarkdownRedactor>-->
<!--    <MarkdownRenderer v-else :initial-text="feed.contents"></MarkdownRenderer>-->
    <EditableDiv class="contents" v-model="feed.contents" :editable="isInEditMode"></EditableDiv>

    <br>
    <br>
    <br>

    <div class="info">Тэги для поиска</div>
    <TagsCloud v-model="feed.tags" :can-all="isInEditMode"></TagsCloud>

    <br>
    <br>
    <br>
    <br>

    <div class="buttons-container">
      <button v-if="canEdit && isInEditMode" class="button-cancel" @click="setNotEdited"><img src="../../res/icons/cross.svg" alt="cancel">Отменить</button>

      <button v-if="canEdit && !isInEditMode" class="button-edit" @click="isInEditMode = true"><img src="../../res/icons/edit.svg" alt="edit">Изменить</button>
      <button v-if="canEdit && isInEditMode" class="button-save" @click="editFeed"><img src="../../res/icons/save.svg" alt="save">Сохранить</button>

      <button v-if="isInCreateMode" class="button-create" @click="createFeed"><img src="../../res/icons/plus.svg" alt="plus">Создать</button>
    </div>
  </div>
</template>


<script>
// import MarkdownRedactor from "@sergtyapkin/markdown/MarkdownRedactor.vue";
// import MarkdownRenderer from "@sergtyapkin/markdown/MarkdownRenderer.vue";
import EditableDiv from "~/components/EditableDiv.vue";
import {DragNDropLoader} from "@sergtyapkin/image-uploader";
import {
  DEFAULT_AVATAR_URL,
  IMAGE_MAX_RES,
  IMAGE_PROFILE_MAX_RES,
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

      feedId: this.$route.params.id,
      feed: {
        id: '',
        title: '',
        contents: '',
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
      return (this.feed.authorId === this.$user.id);
    },

    isInCreateMode() {
      return this.feedId === undefined;
    }
  },

  mounted() {
    if (!this.isInCreateMode) {
      this.getFeed();
    } else {
      this.isInEditMode = true;
    }
  },

  methods: {
    async getFeed() {
      this.loading = true;
      const {data, ok} = await this.$api.getFeedById();
      this.loading = false;

      if (!ok) {
        this.$popups.error('Ошибка', 'Не удалось получить список проектов');
        return;
      }

      this.feed = data;
    },
    async updateAvatar(dataURL) {
      if (this.isInCreateMode) {
        this.feed.previewUrl = dataURL;
        return;
      }
      this.loading = true;
      const {ok} = await this.$api.editFeedPreview(this.feedId, dataURL);
      this.loading = false;
      if (!ok) {
        this.$popups.error('Не получилось загрузить картинку', 'Неизвестная ошибка');
        return;
      }
      this.$popups.success('Успешно', 'Картинка обновлена');
      this.feed.previewUrl = dataURL;
    },

    async createFeed() {
      if (
        !this.feed.title ||
        !this.feed.contents ||
        !this.feed.region ||
        !this.feed.format
      ) {
        this.$popups.error('Не заполнены поля', 'Заполните поля названия, целей, региона, формата');
        return;
      }
      this.loading = true;
      const {ok} = await this.$api.createFeed(this.feed.title, this.feed.contents, this.feed.tags, this.feed.region, this.feed.format, this.feed.docs, this.feed.previewUrl);
      this.loading = false;

      if (!ok) {
        this.$popups.error('Не получилось создать поект', 'Неизвестная ошибка');
        return;
      }
      this.$router.push({name: 'myFeeds'});
    },

    async editFeed() {
      this.loading = true;
      const {ok} = await this.$api.editFeed(this.feedId, this.feed.title, this.feed.contents, this.feed.tags, this.feed.region, this.feed.format, this.feed.docs);
      this.loading = false;

      if (!ok) {
        this.$popups.error('Не получилось создать поект', 'Неизвестная ошибка');
        return;
      }
      this.$router.push({name: 'myFeeds'});
    },

    setEdited() {
      window.onbeforeunload = (e) => {
        e.preventDefault();
        e.returnValue = '';
      };
      this.isInEditMode = true;
    },
    setNotEdited() {
      window.onbeforeunload = null;
      this.isInEditMode = false;
    },
  }
}
</script>
