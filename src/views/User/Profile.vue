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
      block-emp-1(15px, 15px)
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
      block-emp-2(-15px, -15px)
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
        width 100%
        height 100%
        aspect-ratio 1/1
        overflow hidden
        centered-margin()
        margin-bottom 40px
        position relative
        .image-loader
          width 100%
          height 100%
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
        .button-cancel
          flex 1
          button-fill-accent()
          padding 10px 20px
          centered-margin()
          svg-inside(20px)
          @media({mobile})
            font-size 0

        .button-cancel
        .button-exit
          flex 0
          button-danger()
          @media({mobile})
            font-size 0
          img
            transform rotate(180deg)
        .button-cancel
          background none
        .button-edit
          img
            filter invert(1)
</style>

<template>
  <div class="root-profile">
    <div class="columns-container" @input="setEdited">
      <section class="section main-data __animation-started" style="--animation-index: 0">
        <div class="bg">
          <header class="title">{{ curUserData.firstName }} {{ curUserData.midName }}</header>
          <header class="subtitle">{{ UserRoles[curUserData.role] }} ID{{ curUserData.id }}</header>

          <div class="avatar-container">
            <CircleLoading v-if="loading"></CircleLoading>
            <DragNDropLoader v-else class="image-loader"
                             @load="updateAvatar"
                             :crop-to-square="true"
                             :compress-size="IMAGE_PROFILE_MAX_RES"
            >
              <img class="avatar" :src="$user.photoUrl || DEFAULT_AVATAR_URL" alt="avatar">
            </DragNDropLoader>
          </div>

          <div class="data-rows">
            <div class="data-row">
              <div class="field">Имя:</div>
              <input class="data" v-model="curUserData.firstName" :disabled="!isInEditData" placeholder="Ввше имя">
            </div>
            <div class="data-row">
              <div class="field">Фамилия:</div>
              <input class="data" v-model="curUserData.lastName" :disabled="!isInEditData" placeholder="Ввша фимилия">
            </div>
            <div class="data-row">
              <div class="field">Отчество:</div>
              <input class="data" v-model="curUserData.midName" :disabled="!isInEditData" placeholder="Ввше отчество">
            </div>
          </div>

          <div class="buttons-container">
            <button v-if="!isInEditData" class="button-exit" @click="logout"><img src="../../../res/icons/exit_to_app.svg" alt="logout"></button>
            <button v-else class="button-cancel" @click="setNotEdited"><img src="../../../res/icons/cross.svg" alt="edit">Отмена</button>

            <button v-if="!isInEditData" class="button-edit" @click="isInEditData = true"><img src="../../../res/icons/edit.svg" alt="edit">Изменить</button>
            <button v-else class="button-save" @click="saveUserData"><img src="../../../res/icons/save.svg" alt="edit">Сохранить</button>
          </div>
        </div>
      </section>


      <section class="section side-data __animation-started" style="--animation-index: 1">
        <div class="bg">
          <div class="data-rows">
            <div class="data-row">
              <div class="field">Email:</div>
              <input class="data" v-model="curUserData.email" :disabled="!isInEditData" placeholder="Ваш email">
            </div>
            <div class="data-row">
              <div class="field">Телефон:</div>
              <input class="data" v-model="curUserData.phone" :disabled="!isInEditData" placeholder="Ваш телефон">
            </div>
            <div class="data-row">
              <div class="field">О себе:</div>
              <textarea rows="4" class="data" v-model="curUserData.bio" :disabled="!isInEditData" placeholder="Пара слов о себе"></textarea>
            </div>

            <div class="data-row">
              <div class="field">Интересы:</div>
            </div>
            <TagsCloud v-model="curUserData.interests" :can-all="isInEditData" :limit="9"></TagsCloud>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>


<script>
import CircleLoading from "~/components/loaders/CircleLoading.vue";
import {Validators} from "~/utils/validators";
import {DEFAULT_AVATAR_URL, IMAGE_MAX_RES, IMAGE_PROFILE_MAX_RES, UserRolesToNames} from "~/utils/constants";
import TagsCloud from "~/components/TagsCloud.vue";
import DragNDropLoader from "@sergtyapkin/image-uploader/vue";


export default {
  components: {DragNDropLoader, TagsCloud, CircleLoading },

  data() {
    return {
      loading: false,
      isInEditData: false,
      curUserData: {},

      IMAGE_PROFILE_MAX_RES,
      IMAGE_MAX_RES,
      DEFAULT_AVATAR_URL,
      UserRoles: UserRolesToNames,
    }
  },

  async mounted() {
    this.copyFieldsFrom$User()
  },

  methods: {
    copyFieldsFrom$User() {
      this.curUserData.id = this.$user.id;
      this.curUserData.firstName = this.$user.firstName;
      this.curUserData.midName = this.$user.midName;
      this.curUserData.lastName = this.$user.lastName;
      this.curUserData.email = this.$user.email;
      this.curUserData.phone = this.$user.phone;
      this.curUserData.bio = this.$user.bio;
      this.curUserData.role = this.$user.role;
      this.curUserData.interests = structuredClone(this.$user.interests);
    },

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
      if (! Validators.name.validate(newUserData.lastName)) {
        this.$popups.error("Ошибка ввода", "В поле фамилии");
        return;
      }
      if (! Validators.name.validate(newUserData.midName)) {
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
      this.loading = false;

      if (!ok) {
        this.$popups.error('Не получилось выйти из аккаунта', 'Неизвестная ошибка');
        return;
      }
      this.$store.dispatch("DELETE_USER");
      this.$router.push({name: "login"});
    },

    setEdited() {
      window.onbeforeunload = (e) => {e.preventDefault(); e.returnValue = '';};
      this.isInEditData = true;
    },
    setNotEdited() {
      this.copyFieldsFrom$User();
      window.onbeforeunload = null;
      this.isInEditData = false;
    }
  },
}
</script>
