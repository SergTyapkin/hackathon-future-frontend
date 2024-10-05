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
      <div class="box user-block">
        <div class="user-name-row">
          <div class="user-name-id-block">
            <div class="user-name">{{ $user.name }}</div>
            <div class="user-id">#{{ String($user.id || '').padStart(4, '0') }}</div>
          </div>
          <button class="copy-id-button" @click="copyToClipboard($user.id, 'Твоё ID')"><img src="../../../res/icons/copy.svg" alt=""></button>

          <CircleLoading v-if="loadingProfile" size="30px" light></CircleLoading>
          <button v-else class="button-edit" @click="changeUserParam('name')">Изменить</button>
        </div>
        <div class="data-row">
          <div class="field">Группа:</div>
          <div class="data">{{ $user.group }}</div>
          <button class="button-edit" @click="changeUserParam('group')">Изменить</button>
        </div>
        <div class="data-row">
          <div class="field">Email:</div>
          <div class="data">{{ $user.email }}</div>
          <button class="button-edit" @click="changeUserParam('email')">Изменить</button>
        </div>
        <div class="data-row">
          <div class="field">Telegram:</div>
          <div class="data">@{{ $user.tg }}</div>
          <button class="button-edit" @click="changeUserParam('telegram', 'tg')">Изменить</button>
        </div>
        <div class="data-row">
          <div class="field">Вконтакте:</div>
          <div class="data">vk.com/{{ $user.vk }}</div>
          <button class="button-edit" @click="changeUserParam('vk')">Изменить</button>
        </div>
        <div class="data-row">
          <div class="field">Номер телефона:</div>
          <div class="data">{{ $user.phone }}</div>
          <button class="button-edit" @click="changeUserParam('phone_number', 'phone')">Изменить</button>
        </div>

        <div class="buttons-row">
          <router-link :to="{name: 'changePassword'}">
            <button class="change-password">Сменить пароль</button>
          </router-link>

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
    async changeUserParam(fieldName, fieldNameUser=fieldName, overrideHavingValue=null) {
      const newUserData = {
        name: this.$user.name,
        group: this.$user.group,
        telegram: this.$user.tg,
        vk: this.$user.vk,
        email: this.$user.email,
        phone_number: this.$user.phone,
      };
      const inputValue = await this.$modals.prompt(overrideHavingValue ? "Неверный формат" : "Изменить значение поля", "Введите новое значение", overrideHavingValue || newUserData[fieldName]);
      if (!inputValue) {
        return;
      }
      if (!Validators[fieldNameUser].validate(inputValue)) {
        this.changeUserParam(fieldName, fieldNameUser, inputValue);
        return;
      }

      newUserData[fieldName] = Validators[fieldNameUser].prettifyResult(inputValue);
      this.loadingProfile = true;
      const {ok} = await this.$api.editProfile(newUserData.name, newUserData.group, newUserData.telegram, newUserData.vk, newUserData.email, newUserData.phone_number);
      this.loadingProfile = false;
      if (!ok) {
        this.$popups.error(`Не удалось изменить значение поля ${fieldName}`);
        return;
      }
      this.$user[fieldNameUser] = newUserData[fieldName];
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

    copyToClipboard(str, description) {
      navigator.clipboard.writeText(str);
      this.$popups.success("Скопировано", `${description} скопировано в буфер обмена`)
    },
  },
}
</script>
