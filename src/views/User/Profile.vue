<style lang="stylus" scoped>
@require '../../styles/constants.styl'
@require '../../styles/buttons.styl'
@require '../../styles/fonts.styl'
@require '../../styles/utils.styl'


          
</style>

<template>
  <div class="root-profile">
    <div class="content-block">
      <header class="header">ПРОФИЛЬ</header>
      <div class="profile-info">
        <div class="user-icon-name">
          <div class="user-photo">
            <img>
          </div>
          <div class="user-name">
            <input class="data" v-model="$user.name">
          </div>
        </div>
        <div class="user-data">
          <header class="header-1">Данные</header>
          <div class="data-info">
            <div class="contacts-form">
              <div class="contacts">
                <div class="data-row">
                  <div class="field">Email:</div>
                  <input class="data" v-model="$user.email">
                </div>
                <div class="data-row">
                  <div class="field">Номер телефона:</div>
                  <input class="data" v-model="$user.phone">
                </div>
                <div class="data-row">
                  <div class="field">Интересы:</div>
                  <input class="data" v-model="$user.interests">
                </div>
              </div>
              <button v-if="!isInEditData" class="button-edit" @click="isInEditData = true">Изменить</button>
              <button v-else class="button-save" @click="saveUserData">Сохранить</button>
            </div>
            <div class="parol-info">
              <div class="data-row">
                <div class="field">Пароль:</div>
                <div class="data">****</div>
                <div class="button-edit">
                  <button class="change-password">Сменить пароль</button>

                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="logout">
          <button class="logout-button" @click="logout">Выйти</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import CircleLoading from "~/components/CircleLoading.vue";
import FloatingButton from "~/components/FloatingButton.vue";
import {Validators} from "~/utils/validators";


export default {
  components: { FloatingButton, Range, CircleLoading },

  data() {
    return {
      loadingProfile: false,
      isEdited: false,
    }
  },

  async mounted() {
    await this.init();
  },



  methods: {
    async saveUserData(name,email,phone,interests){
      this.loading = true;
      const {ok} = await this.$api.editProfile(this.$user.name,this.$user.email,this.$user.phone,this.$user.interests);
      this.loading = false;

      if (!ok) {
        this.$popups.error('Ошибка','Не удалось изменить данные');
        return;
      }
      this.isInEditData = false;
    },
  


    async logout() {
      this.loadingProfile = true;
      const {data, code, ok} = await this.$api.logout();
      this.loadingProfile = true;

      if (!ok) {
        this.$popups.error('Не получилось выйти из аккаунта', 'Неизвестная ошибка');
        return;
      }
      this.$store.dispatch("DELETE_USER");
      this.$router.push({name: "login"});
    },

    
  },
}
</script>
