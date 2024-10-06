<style scoped lang="stylus">
@require '../../styles/constants.styl'
@require '../../styles/buttons.styl'
@require '../../styles/components.styl'

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

    .button-register
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
      <div class="title">ВХОД</div>

      <FormWithErrors
        ref="form"
        :fields="fields"
        submitText="Отправить"
        @success="login"
        :loading="loading"
      ></FormWithErrors>

      <router-link class="button-register" :to="{name: 'register'}">Зарегистрироваться</router-link>
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
        email: {
          title: 'Электронная почта',
          name: 'email',
          type: 'text',
          placeholder: 'support@projector.ru',
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

