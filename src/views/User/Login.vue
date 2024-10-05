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
      ВХОД<br>
      <FormWithErrors
        ref="form"
        :fields="fields"
        submitText="Вход"
        @success="login"
        :loading="loading"
      ></FormWithErrors>
      <router-link class="profile-link" :to="{name: 'register'}">
        <button class="profile-button">Зарегистрироваться</button>
      </router-link>

<!--      <div class="signin-links">-->
<!--        <router-link class="signin-by-email-link" :to="{name: 'signInByEmail'}">Войти по почте</router-link>-->
<!--        <router-link class="restore-password-link" :to="{name: 'restorePassword'}">Восстановить пароль</router-link>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>
import FormWithErrors from "~/components/FormWithErrors.vue";
import {detectBrowser, detectOS} from "~/utils/utils";
import CircleLoading from "~/components/loaders/CircleLoading.vue";
import {Validators} from "~/utils/validators";


export default {
  components: {CircleLoading, FormWithErrors},
  data() {
    return {
      fields: {
        email: {
          title: 'Электронная почта',
          name: 'email',
          type: 'text',
          placeholder: 'legends@bmstu.ru',
          validationRegExp: Validators.email.regExp,
          prettifyResult: Validators.email.prettifyResult,
          autocomplete: 'email',
        },
        password: {
          title: 'Пароль',
          name: 'password',
          type: 'password',
          placeholder: '●●●●●●',
          validationRegExp: Validators.password.regExp,
          prettifyResult: Validators.password.prettifyResult,
          autocomplete: 'password',
        }
      },
      loading: false,
    }
  },

  methods: {
    async login(data) {
      this.loading = true;
      const {ok} = await this.$api.login(data.email, data.password, detectBrowser(), detectOS());
      this.loading = false;

      if (!ok) {
        this.$refs.form.setError([this.fields.email, this.fields.password], 'Неверные email или пароль');
        return;
      }
      this.loading = true;
      await this.$store.dispatch('GET_USER');
      this.loading = false;
      this.$router.push({name: 'profile'});
    }
  }
}
</script>

