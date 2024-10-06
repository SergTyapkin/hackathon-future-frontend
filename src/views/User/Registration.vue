<style scoped lang="stylus">
@require '../../styles/constants.styl'
@require '../../styles/buttons.styl'

.root-signin
  .container-content
    padding 80px
    @media({mobile})
      padding 80px 30px
    max-width 700px
    .title
      font-large-extra()
      font-bold()
      margin-bottom 30px

    .button-login
      button-link()


  .bg
    position absolute
    width 50%
    left 50%
    z-index -1
    top 20%
    transform rotate(180deg)

</style>

<template>
  <div class="root-signin">
    <div class="container-content">
      <div class="title">РЕГИСТРАЦИЯ</div>

      <FormWithErrors
        ref="form"
        :fields="fields"
        submitText="Отправить"
        @success="register"
        :loading="loading"
      ></FormWithErrors>

      <router-link class="button-login" :to="{name: 'login'}">Войти в аккаунт</router-link>
    </div>

    <img src="../../../res/images/worm21.svg" alt="bg" class="bg">
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
        firstname: {
          title: 'Фамилия',
          name: 'firstname',
          type: 'text',
          placeholder: 'Иванов',
          validationRegExp: Validators.name.regExp,
          prettifyResult: Validators.name.prettifyResult,
          autocomplete: 'firstname',
        },
        midname: {
          title: 'Имя',
          name: 'midname',
          type: 'text',
          placeholder: 'Иван',
          validationRegExp: Validators.name.regExp,
          prettifyResult: Validators.name.prettifyResult,
          autocomplete: 'midname',
        },
        lastname: {
          title: 'Отчество',
          name: 'lastname',
          type: 'text',
          placeholder: 'Иванович',
          validationRegExp: Validators.name.regExp,
          prettifyResult: Validators.name.prettifyResult,
          autocomplete: 'lastname',
        },
        email: {
          title: 'Электронная почта',
          name: 'email',
          type: 'text',
          placeholder: 'support@projector.ru',
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
      const {status, ok} = await this.$api.register(data.firstname, data.midname, data.lastname, data.email, data.phone, data.password, detectBrowser(), detectOS());
      this.loading = false;

      if (status === 409) {
        this.$refs.form.setError([this.fields.email], 'На указанный email уже зарегестрирован аккаунт');
        return;
      }
      if (!ok) {
        this.$popups.error('Ошибка', 'Не удалось зарегистрироваться');
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

