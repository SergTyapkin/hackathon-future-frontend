<style lang="stylus" scoped>
@require '../styles/constants.styl'
@require '../styles/fonts.styl'
@require '../styles/buttons.styl'
@require '../styles/animations.styl'
@require '../styles/components.styl'

.root-tags-cloud
  .tags-container
    display flex
    flex-wrap wrap
    gap 10px
    .tag-container
    .adding-container
      display flex
      justify-content stretch
      align-items stretch
      border-radius 999999px
      border 2px solid colorEmp11
      background colorBg
      .input
        input-no-styles()
        font-small-extra()
        padding 5px 10px
        overflow hidden
        text-align center
      .button-delete
      .button-add
        button-no-styles()
        font-small()
        padding 0 10px
        border-left 2px solid colorEmp11
        centered-flex-container()
        img
          width 30px
          height 30px
          opacity 0.5

    .adding-container
      .input
        trans()
        &:not(:focus)
          max-width 0
          padding 0
          & + .button-add
          & + .button-delete
            border-left transparent

</style>

<template>
  <div class="root-tags-cloud">
    <div class="tags-container">
      <div v-if="(canAdd || canAll) && (limit === undefined || modelValue.length < limit)" class="adding-container">
        <input class="input" :size="newTagText.length + 1" maxlength="30" v-model="newTagText" :class="{visible: isInputFocused}" ref="input" @focus="isInputFocused = true" @blur="onBlurInput" @keydown.enter="onBlurInput">
        <button class="button-add" @click="onClickOnAddButton"><img src="../../res/icons/plus.svg" alt="plus"></button>
      </div>

      <div v-for="(tag, idx) in modelValue" class="tag-container">
        <input class="input" :size="tag.length + 1" maxlength="30" v-model="modelValue[idx]" :disabled="!(canEdit || canAll)">
        <button v-if="canDelete || canAll" class="button-delete" @click="deleteItem(idx)"><img src="../../res/icons/trashbox.svg" alt="delete"></button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  emits: ['update:modelValue'],

  props: {
    modelValue: {
      type: [],
      required: true,
    },
    limit: Number,
    canAll: Boolean,
    canAdd: Boolean,
    canEdit: Boolean,
    canDelete: Boolean,
  },

  data() {
    return {
      newTagText: '',
      isInputFocused: false,
    }
  },

  mounted() {
  },

  methods: {
    updateModelValue() {
      this.$emit('update:modelValue', this.modelValue);
    },

    onBlurInput() {
      this.isInputFocused = false;
      this.addItem(this.newTagText);
      this.newTagText = '';
    },

    onClickOnAddButton() {
      if (!this.newTagText) {
        this.$refs.input.focus();
        return;
      }
      this.addItem(this.newTagText);
      this.$refs.input.blur();
      this.newTagText = '';
    },


    addItem(val) {
      if (!val) {
        return;
      }
      if (this.modelValue.findIndex(a => a === val) !== -1) {
        return;
      }
      this.modelValue.unshift(val)

      this.updateModelValue();

      this.$forceUpdate();
    },

    deleteItem(idx) {
      this.modelValue.splice(idx, 1)

      this.updateModelValue();

      this.$forceUpdate();
    },
  }
};
</script>
