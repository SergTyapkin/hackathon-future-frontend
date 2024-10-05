<style lang="stylus" scoped>

</style>

<template>
  <div class="root-restore-password">
<!--    <div v-if="!code">-->
<!--      <Form v-if="!emailSent"-->
<!--            ref="formEmail"-->
<!--            title="Восстановление пароля" description="Теперь осталось вспомнить почту. Она ведь указана, правда?"-->
<!--            :fields="[-->
<!--              { title: 'E-mail', autocomplete: 'on', jsonName: 'email', type: 'email', info: 'А я ведь предупреждал, что ты его забудешь'},-->
<!--            ]"-->
<!--            submit-text="Выслать письмо"-->
<!--            @submit="sendRestorePasswordEmail"-->
<!--      >Неожиданно вспомнился старый пароль? <br> <router-link :to="base_url_path + `/signin`" class="link">Войти как нормальный человек</router-link>-->
<!--      </Form>-->

<!--      <Form v-else :no-submit="true" title="Письмо на твоей почте">-->
<!--        Не забудь проверить папку <b><big>спам</big></b>. <br> Перейди по ссылке из письма, и будет тебе счастье-->
<!--      </Form>-->
<!--    </div>-->

<!--    <Form v-else-->
<!--          ref="formPassword"-->
<!--          title="Восстановление пароля" description="Давай хотя бы в этот раз ты его не забудешь, ладно?"-->
<!--          :fields="[-->
<!--            { title: 'НОВЫЙ ПАРОЛЬ', autocomplete: 'on', jsonName: 'password', type: 'password', info: 'Забудешь второй раз? А по жопе?'},-->
<!--            { title: 'НОВЫЙ ПАРОЛЬ ЕЩЁ РАЗ', jsonName: 'passwordConfirm', type: 'password', info: 'Не ошибись'},-->
<!--          ]"-->
<!--          submit-text="Сменить пароль"-->
<!--          @submit="restorePassword"-->
<!--    >Неожиданно вспомнился старый пароль? <br> <router-link :to="base_url_path + `/signin`" class="link">Войти как нормальный человек</router-link>-->
<!--    </Form>-->
  </div>
</template>


<script>
import FormWithErrors from "~/components/FormWithErrors.vue";

export default {
  components: {FormWithErrors},

  data() {
    return {
      code: this.$route.query.code,
      emailSent: false,
    }
  },

  methods: {
    validatePasswords(password, passwordConfirm) {
      let ok = true;
      if (password.length === 0) {
        this.$refs.formPassword.errors.password = 'Пароль не может быть пустым';
        ok = false;
      }
      if (password !== passwordConfirm) {
        this.$refs.formPassword.errors.password = 'Пароли не совпадают';
        this.$refs.formPassword.errors.passwordConfirm = 'Пароли не совпадают';
        ok = false;
      }
      return ok;
    },


    async sendRestorePasswordEmail({email}) {
      this.$refs.formEmail.loading = true;
      const response = await this.$api.sendRestorePasswordEmail(email);
      this.$refs.formEmail.loading = false;

      if (response.ok_) {
        this.$popups.success('Отправлено', 'Письмо для восстановления пароля выслано на вашу почту');
        this.emailSent = true;
        return;
      }

      if (response.status_ === 404) {
        this.$refs.formEmail.errors.email = 'Этот email не зарегистрирован';
        this.$refs.formEmail.showError();
        return;
      }

      this.$popups.error("Не удалось выслать письмо", response.info || "Произошла неизвестная ошибка");
    },

    async restorePassword({password, passwordConfirm}) {
      if (!this.validatePasswords(password, passwordConfirm))
        return;

      this.$refs.formPassword.loading = true;
      const response = await this.$api.restorePassword(this.code, password);
      this.$refs.formPassword.loading = false;

      if (!response.ok_) {
        this.$popups.error("Не удалось изменить пароль", response.info || "Произошла неизвестная ошибка");
        return;
      }

      this.$popups.success('Пароль изменен!');
      this.$refs.formPassword.errors = {};
      this.$router.push({name: 'signin'});
    },
  }
}
</script>
