<style lang="stylus" scoped>
@require '../../styles/constants.styl'
@require '../../styles/buttons.styl'
@require '../../styles/fonts.styl'
@require '../../styles/utils.styl'
@require '../../styles/components.styl'
@require '../../styles/animations.styl'

.root-profile
  padding 80px
  @media({mobile})
    padding 80px 20px
  .columns-container
    width 100%
    display flex
    gap 60px
    align-items stretch
    justify-content center
    @media({mobile})
      flex-direction column
    .section
      flex 1
      max-width 500px
      animation-opacity-slide-in(0, -50px)
      block-emp-1()
      padding 0
      .bg
        border colorEmp16 5px solid
        background colorBg
        width 100%
        height 100%
        border-radius borderRadiusXL
        padding 30px
        color colorText1
        font-medium()
    .section.side-data
      block-emp-2()
      padding 0
      .bg
        background colorBg
        border colorEmp21 5px solid
        border-radius borderRadiusXL

    .section .bg
      display flex
      flex-direction column
      .title
        font-large()
        text-align center
      .subtitle
        font-small()
        color colorText5
        text-align center
        margin-bottom 15px

      .avatar-container
        border-radius 999999px
        background colorEmp23
        border 2px solid colorEmp21
        min-width 100px
        min-height 100px
        max-width 150px
        max-height 150px
        aspect-ratio 1/1
        overflow hidden
        centered-margin()
        margin-bottom 40px
        position relative
        img
          width 100%
          height 100%
          display block
          object-fit cover

      .data-rows
        flex 1
        display flex
        flex-direction column
        gap 15px
        margin-bottom 60px
        .data-row
          display flex
          align-items center
          justify-content space-between
          gap 20px
          font-small()
          .field
            flex 0.4
            color colorText5
          .data
            flex 1
            input()
          textarea.data
            resize vertical
            transition all 0.2s ease, height 0s
            max-height 200px

      .buttons-container
        display flex
        gap 20px
        .button-exit
        .button-edit
        .button-save
          flex 1
          button-fill-accent()
          padding 10px 20px
          centered-margin()
          svg-inside(20px)

        .button-exit
          flex 0
          button-danger()
          img
            transform rotate(180deg)
</style>

<template>
  <div class="root-profile">
    <div class="columns-container" @input="setEdited">
      <section class="section main-data __animation-started" style="--animation-index: 0">
        <div class="bg">
          <header class="title">{{ $user.firstName }} {{ $user.midName }}</header>
          <header class="subtitle">{{ UserRoles[$user.role] }} ID{{ $user.id }}</header>

          <div class="avatar-container">
            <CircleLoading v-if="loading"></CircleLoading>
            <DragNDropLoader v-else class="image-loader" @load="updateAvatar"
                             :crop-size="cropSize"
                             :compress-size="compressSize"
            >
              <div class="avatar-div" @click.stop="updateAvatar(undefined)">
                <img class="avatar" :src="$user.photoUrl || DEFALUT_AVATAR_URL" alt="avatar">
              </div>
            </DragNDropLoader>
          </div>

          <div class="data-rows">
            <div class="data-row">
              <div class="field">Имя:</div>
              <input class="data" v-model="$user.firstName" :disabled="!isInEditData" placeholder="Ввше имя">
            </div>
            <div class="data-row">
              <div class="field">Фамилия:</div>
              <input class="data" v-model="$user.midName" :disabled="!isInEditData" placeholder="Ввша фимилия">
            </div>
            <div class="data-row">
              <div class="field">Отчество:</div>
              <input class="data" v-model="$user.lastName" :disabled="!isInEditData" placeholder="Ввше отчество">
            </div>
          </div>

          <div class="buttons-container">
            <button class="button-exit" @click="logout"><img src="../../../res/icons/exit_to_app.svg" alt="logout"></button>

            <button v-if="!isInEditData" class="button-edit" @click="isInEditData = true"><img src="../../../res/icons/edit.svg" alt="edit">Изменить</button>
            <button v-else class="button-save" @click="saveUserData"><img src="../../../res/icons/save.svg" alt="edit">Сохранить</button>
          </div>
        </div>
      </section>


      <section class="section side-data __animation-started" style="--animation-index: 0">
        <div class="bg">
          <div class="data-rows">
            <div class="data-row">
              <div class="field">Email:</div>
              <input class="data" v-model="$user.email" :disabled="!isInEditData" placeholder="Ваш email">
            </div>
            <div class="data-row">
              <div class="field">Телефон:</div>
              <input class="data" v-model="$user.phone" :disabled="!isInEditData" placeholder="Ваш телефон">
            </div>
            <div class="data-row">
              <div class="field">О себе:</div>
              <textarea rows="3" class="data" v-model="$user.bio" :disabled="!isInEditData" placeholder="Пара слов о себе"></textarea>
            </div>

            <div class="data-row">
              <div class="field">Интересы:</div>
            </div>
            <TagsCloud v-model="$user.interests" :can-all="isInEditData" :limit="9"></TagsCloud>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>


<script>
import CircleLoading from "~/components/loaders/CircleLoading.vue";
import FloatingButton from "~/components/FloatingButton.vue";
import {Validators} from "~/utils/validators";
import ImageDefaultAvatar from "~/../res/icons/profile.svg"
import {IMAGE_MAX_RES, IMAGE_PROFILE_MAX_RES, UserRoles} from "~/utils/constants";
import TagsCloud from "~/components/TagsCloud.vue";
import DragNDropLoader from "~/components/DragNDropLoader.vue";


const DEFALUT_AVATAR_URL = ImageDefaultAvatar;

export default {
  components: {DragNDropLoader, TagsCloud, FloatingButton, Range, CircleLoading },

  data() {
    return {
      loading: false,
      isInEditData: false,
      isEdited: false,

      cropSize: IMAGE_PROFILE_MAX_RES,
      compressSize: IMAGE_MAX_RES,
      DEFALUT_AVATAR_URL,
      UserRoles,
    }
  },

  async mounted() {
  },

  methods: {
    async saveUserData() {
      const newUserData = {
        firstName: this.$user.firstName,
        midName: this.$user.midName,
        lastName: this.$user.lastName,
        email: this.$user.email,
        phone: this.$user.phone,
        // photoUrl: this.$user.photoUrl,
        interests: this.$user.interests,
        bio: this.$user.bio,
      };

      if (! Validators.name.validate(newUserData.firstName)) {
        this.$popups.error("Ошибка ввода", "В поле имени");
        return;
      }
      if (! Validators.name.validate(newUserData.midName)) {
        this.$popups.error("Ошибка ввода", "В поле фамилии");
        return;
      }
      if (! Validators.name.validate(newUserData.lastName)) {
        this.$popups.error("Ошибка ввода", "В поле отчества");
        return;
      }
      if (! Validators.email.validate(newUserData.email)) {
        this.$popups.error("Ошибка ввода", "В поле Email");
        return;
      }
      if (! Validators.phone.validate(newUserData.phone)) {
        this.$popups.error("Ошибка ввода", "В поле телефона");
        return;
      }

      newUserData.firstName = Validators.name.prettifyResult(newUserData.firstName);
      newUserData.midName = Validators.name.prettifyResult(newUserData.midName);
      newUserData.lastName = Validators.name.prettifyResult(newUserData.lastName);
      newUserData.email = Validators.email.prettifyResult(newUserData.email);
      newUserData.phone = Validators.phone.prettifyResult(newUserData.phone);
      newUserData.bio = Validators.text.prettifyResult(newUserData.bio);

      this.loading = true;
      const {ok} = await this.$api.editProfile(newUserData.firstName, newUserData.midName, newUserData.lastName, newUserData.interests, newUserData.email, newUserData.phone, newUserData.bio);
      this.loading = false;
      if (!ok) {
        this.$popups.error('Ошибка', 'Не удалось сохранить данные');
        return;
      }
      this.$store.dispatch('GET_USER');
    },

    async updateAvatar(dataURL) {
      this.loading = true;
      const {ok} = await this.$api.editAvatar(dataURL);
      this.loading = false;
      if (!ok) {
        this.$popups.error('Не получилось загрузить картинку', 'Неизвестная ошибка');
        return;
      }

      this.$user.photoUrl = dataURL;
    },


    async logout() {
      if (!(await this.$modal.confirm("Вы действительно хотите выйти из аккаунта?"))) {
        return;
      }

      this.loading = true;
      const {ok} = await this.$api.logout();
      this.loading = true;

      if (!ok) {
        this.$popups.error('Не получилось выйти из аккаунта', 'Неизвестная ошибка');
        return;
      }
      this.$store.dispatch("DELETE_USER");
      this.$router.push({name: "login"});
    },

    setEdited() {
      window.onbeforeunload = (e) => {e.preventDefault(); e.returnValue = '';};
    }
  },
}
</script>
