<style lang="stylus" scoped>
@require '../styles/constants.styl'
@require '../styles/fonts.styl'


.root-drag-n-drop-loader
  &::before
  &::after
    content 'Изменить'
    border-radius(50%)
    overflow hidden
    font-family Arial
    padding-left 5px
    font-size 15px
    text-align center
    display flex
    align-items center
    position absolute
    inset 0
    background #000000AA
    z-index 1
    opacity 0
    transition opacity 0.3s ease
    cursor pointer
    font-small()
    color colorTextLight1

  &::after
    content 'Отпустите, чтобы загрузить'

  &:hover::before
    opacity 1

  &.in-drag
    &::after
      opacity 1
</style>

<template>
  <div class="root-drag-n-drop-loader" :class="{'in-drag': isInDrag}"
     @dragenter="isInDrag = true"
     @dragleave="isInDrag = false"
     @dragover.prevent="isInDrag = true"
     @drop.prevent="handleDrop"
     @click="getUserImage"
  >
    <div></div>
    <slot></slot>
  </div>
</template>

<script>
import {getImageAsDataURL, getLoadedImageAsDataURL} from "@korolion/get-image-as-dataurl/getImageAsDataURL";


export default {
  emits: ['load'],

  props: {
    cropSize: {
      type: Number,
      required: true,
    },
    compressSize: {
      type: Number,
      required: true,
    },
    maxAllowedSize: {
      type: Number,
      default: Infinity,
    }
  },

  data() {
    return {
      isInDrag: false,
    }
  },

  methods: {
    async handleDrop(event) {
      this.isInDrag = false;
      this.$emit('load', await getLoadedImageAsDataURL(event.dataTransfer, this.cropSize, this.compressSize, this.maxAllowedSize));
    },

    async getUserImage() {
      let dataURL;
      try {
        dataURL = await getImageAsDataURL(this.cropSize, this.compressSize, undefined, Infinity);
      } catch (err) {
        this.popups.error("Ошибка загрузки изображения", err.toString());
        throw err;
      }
      this.$emit('load', dataURL);
    }
  }
};
</script>
