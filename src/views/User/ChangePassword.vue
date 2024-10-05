<style scoped lang="stylus">
@require '../../styles/constants.styl'
@require '../../styles/buttons.styl'

.root-signin
  width 100%
  padding 20px
  .form
    margin 20px auto
    max-width 600px
    background-color colorBg
    border-radius borderRadiusM
    padding 20px
    padding-top 10px
    text-align center
    font-large()
    font-bold()
    color colorText1
    .profile-link
      text-decoration none
      text-align left
    .profile-button
      button-link()
    .signin-links
      display flex
      width 100%
      margin-top 20px
      font-small()
      text-decoration none
      justify-content space-between
      .signin-by-email-link
        color colorText1
        text-decoration none
      .restore-password-link
        color colorText1
        text-decoration none
</style>

<template>
  <div class="root-signin">
    <div class="form">
      СМЕНА ПАРОЛЯ<br>
      <FormWithErrors
        ref="form"
        :fields="fields"
        submitText="Сменить пароль"
        @success="changePassword"
        :loading="loading"
      ></FormWithErrors>

      <router-link class="profile-link" :to="{name: 'profile'}">
        <button class="profile-button">Назад</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import FormWithErrors from "~/components/FormWithErrors.vue";
import CircleLoading from "~/components/CircleLoading.vue";
import {Validators} from "~/utils/validators";


export default {
  components: {CircleLoading, FormWithErrors},
  data() {
    return {
      fields: {
        oldPassword: {
          title: 'Старый пароль',
          name: 'password',
          type: 'password',
          placeholder: '●●●●●●',
          validationRegExp: Validators.password.regExp,
          prettifyResult: Validators.password.prettifyResult,
          autocomplete: 'password',
        },
        newPassword: {
          title: 'Новый пароль',
          name: 'new-password',
          type: 'password',
          placeholder: '●●●●●●',
          validationRegExp: Validators.password.regExp,
          prettifyResult: Validators.password.prettifyResult,
        },
        newPasswordAgain: {
          title: 'Новый пароль ещё раз',
          name: 'new-password',
          type: 'password',
          placeholder: '●●●●●●',
          validationRegExp: Validators.password.regExp,
          prettifyResult: Validators.password.prettifyResult,
        },
      },
      loading: false,
    }
  },

  methods: {
    async changePassword(data) {
      if (data.newPassword !== data.newPasswordAgain) {
        this.$refs.form.setError([this.fields.newPassword, this.fields.newPasswordAgain], 'Пароли не совпадают');
        return;
      }

      this.loading = true;
      const {ok} = await this.$api.changePassword(data.oldPassword, data.newPassword);
      this.loading = false;

      if (!ok) {
        this.$refs.form.setError(this.fields.oldPassword, 'Неверный пароль');
        return;
      }
      this.$popups.success('Пароль изменен', 'Пароль умпешно изменен');

      this.loading = true;
      await this.$store.dispatch('GET_USER');
      this.loading = false;
      this.$router.push({name: 'profile'});
    }
  }
}
</script>

