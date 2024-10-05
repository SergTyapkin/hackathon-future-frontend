<style scoped lang="stylus">
@require '../../styles/constants.styl'
@require '../../styles/buttons.styl'

bg = colorBgDark

.root-register
  width 100%
  padding 20px
  .form
    max-width 600px
    margin 20px auto
    background-color colorBg
    border-radius borderRadiusM
    padding 20px
    padding-top 10px
    text-align center
    font-large()
    font-bold()
    color colorText1
    .signin-link
      text-align left
      text-decoration none
    .signin-button
      button-link()
</style>

<template>
  <div class="root-register">
    <div class="form">
      РЕГИСТРАЦИЯ<br>
      <FormWithErrors
        ref="form"
        :fields="fields"
        submitText="Зарегистрироваться"
        @success="register"
        :loading="loading"
      ></FormWithErrors>
      <router-link class="signin-link" :to="{name: 'login'}">
        <button class="signin-button">Войти</button>
      </router-link>
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
        name: {
          title: 'ФИО',
          name: 'name',
          type: 'text',
          placeholder: 'Иванов Иван Иванович',
          validationRegExp: Validators.name.regExp,
          prettifyResult: Validators.name.prettifyResult,
          autocomplete: 'name',
        },
        group: {
          title: 'Учебная группа',
          name: 'group',
          type: 'text',
          placeholder: 'ОЭ2-11',
          validationRegExp: Validators.group.regExp,
          prettifyResult: Validators.group.prettifyResult,
          autocomplete: 'group',
        },
        tg:{
          title: 'Telegram',
          name: 'telegram',
          type: 'text',
          placeholder: '@legends_bmstu',
          validationRegExp: Validators.tg.regExp,
          prettifyResult: Validators.tg.prettifyResult,
          info: 'В любом формате',
          autocomplete: 'telegram',
        },
        vk: {
          title: 'VK',
          name: 'vk',
          type: 'text',
          placeholder: 'vk.com/legends_bmstu',
          validationRegExp: Validators.vk.regExp,
          prettifyResult: Validators.vk.prettifyResult,
          info: 'В любом формате',
          autocomplete: 'vk',
        },
        email: {
          title: 'Электронная почта',
          name: 'email',
          type: 'text',
          placeholder: 'legends@bmstu.ru',
          validationRegExp: Validators.email.regExp,
          prettifyResult: Validators.email.prettifyResult,
          autocomplete: 'email',
        },
        phone: {
          title: 'Номер телефона',
          name: 'phone',
          type: 'text',
          placeholder: '8-(123)-456-78-90',
          validationRegExp: Validators.phone.regExp,
          prettifyResult: Validators.phone.prettifyResult,
          autocomplete: 'tel',
        },
        password: {
          title: 'Пароль',
          name: 'password',
          type: 'password',
          placeholder: '●●●●●●',
          validationRegExp: Validators.password.regExp,
          prettifyResult: Validators.password.prettifyResult,
          info: 'Минимум 6 символов',
          autocomplete: 'password',
        },
        passwordAgain: {
          title: 'Пароль ещё раз',
          name: 'password',
          type: 'password',
          placeholder: '●●●●●●',
          validationRegExp: Validators.password.regExp,
          prettifyResult: Validators.password.prettifyResult,
        }
      },
      loading: false,
    }
  },

  methods: {
    async register(data) {
      if (data.password !== data.passwordAgain) {
        this.$refs.form.setError([this.fields.password, this.fields.passwordAgain], 'Пароли не совпадают');
        return;
      }

      this.loading = true;
      const {ok} = await this.$api.register(data.name, data.group, data.tg, data.vk, data.email, data.phone, data.password, detectBrowser(), detectOS());
      this.loading = false;

      if (!ok) {
        this.$refs.form.setError([this.fields.email], 'На указанный email уже зарегестрирован аккаунт');
        return;
      }
      this.loading = true;
      await this.$store.dispatch('GET_USER');
      this.loading = true;
      this.$router.push({name: 'profile'});
    }
  }
}
</script>

