<template>
  <slot></slot>
</template>

<script>
export default {
  emits: ['update:modelValue', 'show', 'hide'],

  props: {
    onRef: {
      type: String,
      required: true,
    },
    modelValue: Boolean,
    bottomOffset: {
      type: Number,
      default: 0,
    },
    topOffset: {
      type: Number,
      default: 0,
    },
    noHide: Boolean,
    targetElement: {
      type: HTMLElement,
      default: document.body,
    }
  },

  data() {
    return {
      modelValueCopy: this.$props.modelValue,
    };
  },

  methods: {
    handleScroll() {
      const elObject = this.$slots.default()[0].ref.i.refs[this.onRef];
      const {top, bottom} = elObject.getBoundingClientRect();
      const screenHeight = document.documentElement.clientHeight;
      const isVisible = (this.topOffset < bottom) && ((top + this.bottomOffset) < screenHeight);
      if (this.modelValueCopy !== isVisible && !(this.modelValueCopy === true && this.noHide)) {
        this.$emit('update:modelValue', isVisible);
        this.$emit(isVisible ? 'show' : 'hide');
        this.modelValueCopy = isVisible;
      }
    }
  },
  mounted() {
    this.targetElement.addEventListener('scroll', this.handleScroll);
    this.handleScroll();
  },
  unmounted() {
    this.targetElement.removeEventListener('scroll', this.handleScroll);
  }
};
</script>
