<style lang="stylus" scoped>
@require '../styles/buttons.styl'
@require '../styles/constants.styl'
@require '../styles/fonts.styl'

border-color = colorText1
input-border = 2px solid border-color

.root-form
  .input-container
    position relative
    padding-top 12px

    label
    .placeholder
      position absolute
      top 22px
      left 10px
      text-align left
      padding-left 10px
      font-medium()
      opacity .5
      transition all 0.2s ease
      pointer-events none
      user-select none
    label
      opacity 1

    input
      all unset
      box-sizing border-box
      display block
      width 100%
      border input-border
      border-top-width 0
      text-align left
      padding-top 10px
      padding-bottom 10px
      padding-left 17px
      border-radius borderRadiusL
      outline input-border
      outline-offset -2px
      transition all 0.2s ease, background-size 0.1s ease
      font-medium()
      &::placeholder
        opacity 0
        visibility hidden
      &:focus
      &:not(:placeholder-shown)
        outline-color transparent
        outline-offset 5px
      &:not(:placeholder-shown) ~ label
      &:focus ~ label
        left 15px
        top 2px
        opacity 0.3
      &:not(:focus) ~ .placeholder
      &:not(:placeholder-shown) ~ .placeholder
        opacity 0
        left 40px

    .error
    .success
      position absolute
      top 26px
      right 20px
      font-small-extra()
      opacity 0
      transition opacity 0.2s ease
      pointer-events none
      user-select none
      &.hidden
        opacity 0
    .error
      color colorError
    .success
      color colorSuccess
    .info
      text-align left
      margin-top 2px
      padding-left 20px
      font-small-extra()
      opacity 0.5
      user-select none

    &.error
      color colorError
      .error:not(.hidden)
        opacity 1
    &.success
      color colorSuccess
      .success:not(.hidden)
        opacity 1

  .submit
    button-submit()
    margin-top 10px
    margin-bottom 10px
</style>

<template>
  <div class="root-form" @keydown.enter="submit" @input="() => {isSubmittedAlready ? checkFormat() : null}">
    <div class="input-container" v-for="[fieldName, field] in Object.entries(fields)" :class="{error: field.__error, success: field.__success}">
      <input v-bind="field" :id="`${uid}-${fieldName}`" :type="field.type || 'text'" v-model="field.value" :autocomplete="field.autocomplete || 'off'" placeholder="-">
      <label :for="`${uid}-${fieldName}`">{{ field.title }}</label>
      <div class="info" v-if="field.info">{{ field.info }}</div>
      <div class="placeholder">{{ field.placeholder }}</div>
      <div class="error" :class="{hidden: !errorSuccessShowed}">{{ field.overrideErrorText || field.errorText || 'Неверный формат' }}</div>
      <div class="success" :class="{hidden: !errorSuccessShowed}">{{ field.successText || 'Успех' }}</div>
    </div>

    <button class="submit" @click="submit">
      <transition name="opacity" mode="out-in" duration="200">
        <CircleLoading v-if="loading" size="1.2em"></CircleLoading>
        <span v-else>{{ submitText || 'Отправить' }}</span>
      </transition>
    </button>
  </div>
</template>

<script>
import CircleLoading from "./CircleLoading.vue";

export default {
  components: {CircleLoading},
  emits: ['success', 'error'],

  props: {
    fields: {
      type: Object,
      required: true,
      default: {
        some_field: {
          name: String,
          errorText: String,
          overrideErrorText: null,
          successText: String,
          value: String, // initial value
          regExp: RegExp,
          validator: Function, // (Any) => Boolean
          required: Boolean, // default: false
          noTrimValue: Boolean, // default: false. By default the return value will be trimmed

          type: String(), // default: 'text'
          placeholder: String(),
          autocomplete: String(), // default: 'off'
          //other <input> attributes: String()
        }
      }
    },
    submitText: String, // default: 'Отправить'
    setSuccesses: Boolean, // default: false. Can set on fields only errors
    loading: Boolean, // default: false
  },

  data() {
    return {
      uid: Math.random(),
      errorSuccessShowed: false,

      isSubmittedAlready: false,
    }
  },

  methods: {
    submit() {
      this.isSubmittedAlready = true;
      this.errorSuccessShowed = true;
      // setTimeout(() => this.errorSuccessShowed = false, 1000);

      if (!this.checkFormat()) {
        this.$emit('error');
        return;
      }
      const res = {};
      Object.entries(this.fields).forEach(([fieldName, field]) => {
        const fieldValueTrimmed = field.type === 'text' ? field.value.trim() : field.value;
        res[fieldName] = field.prettifyResult ? field.prettifyResult(fieldValueTrimmed) : fieldValueTrimmed;
      });
      this.$emit('success', res);
    },

    checkFormat() {
      let res = true;
      Object.values(this.fields).forEach(field => {
        field.value = field.value || '';
        const validationText = field.type === 'text' ? (field.noTrimValue ? field.value : field.value.trim()) : field.value;
        if (field.validationRegExp) {
          field.__error = !field.validationRegExp.test(validationText);
        } else if (field.validator) {
          field.__error = !field.validator(validationText);
        } else {
          field.__error = false;
        }
        if (field.__error) {
          field.overrideErrorText = null;
        }
        field.__success = this.setSuccesses && !field.__error;
        res = res && !field.__error;
      });
      return res;
    },

    __setErrorOnField(field, errorText) {
      field.__error = true;
      field.overrideErrorText = errorText;
    },
    setError(fields, errorText) {
      if (Array.isArray(fields)) {
        fields.forEach(field => this.__setErrorOnField(field, errorText));
        return;
      }
      this.__setErrorOnField(fields, errorText);
    }
  }
}
</script>
