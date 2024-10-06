<style scoped lang="stylus">
@require '../styles/constants.styl'
@require '../styles/buttons.styl'
@require '../styles/fonts.styl'
@require '../styles/utils.styl'
@require '../styles/components.styl'
@require '../styles/animations.styl'

.root-page
  padding 100px 80px
  @media({mobile})
    padding 100px 20px
  .section
    min-height calc(100vh - 200px)
    .title
      text-transform uppercase
      font-large-extra()
      font-bold()
      margin-bottom 20px
    ul.listing
      list-no-styles()
      font-medium()
      line-height 2.5
      margin-bottom 30px
      > *
        opacity-slide-show(-50px)
    &:not(:last-child)
      margin-bottom 100px

    .button-join
      button-fill-accent()

    ul.listing-numbers
      list-no-styles()
      display flex
      flex-wrap wrap
      gap 20px
      justify-content space-evenly
      margin-top 70px
      > *
        opacity-slide-show(0, -50px)
        block-emp-2(15px, 10px)
        &:hover
          transition all 0.2s ease
          block-emp-1(15px, 10px)
          padding 40px 40px
        padding 40px 40px
        .number
          font-large-extra()
          font-bold()

    .bg-image
      width 100vw
      position absolute
      left 0
      right 0
      animation open-left 1.2s cubic-bezier(0.21, 0.94, 0.58, 1) running
      @keyframes open-left
        from
          clip-path circle(0%)
        to
          clip-path circle(100%)


  .section.what-we-can-help
    block-emp-1(-15px, -15px)
</style>

<template>
  <div>
    <div class="root-page">
      <section class="section about">
        <header class="title">Реализованные с нами проекты</header>

        <ViewPortWatcher on-ref="section-1-listing-1" v-model="isElementsVisible[0]" :bottom-offset="100" :top-offset="-200">
          <ul class="listing" ref="section-1-listing-1">
            <li style="--animation-index: 0" :class="{'__visible': isElementsVisible[0]}">Восстановление памятника</li>
            <li style="--animation-index: 1" :class="{'__visible': isElementsVisible[0]}">Спортивние мероприятие</li>
            <li style="--animation-index: 2" :class="{'__visible': isElementsVisible[0]}">Исследования нейроинтерфейсов</li>
            <li style="--animation-index: 3" :class="{'__visible': isElementsVisible[0]}">Соревнования пилотов дронов</li>
          </ul>
        </ViewPortWatcher>

        <button class="button-join">Присоединиться</button>

        <img src="../../res/images/worm1.svg" alt="bg" class="bg-image">
      </section>


      <section class="section what-we-can-help">
        <div class="bg-container">
          <header class="title">Реализованные с нами проекты</header>

          <ViewPortWatcher on-ref="section-2-listing-1" v-model="isElementsVisible[1]" :bottom-offset="100" :top-offset="-200">
            <ul class="listing" ref="section-2-listing-1">
              <li style="--animation-index: 0" :class="{'__visible': isElementsVisible[1]}">Восстановление памятника</li>
              <li style="--animation-index: 1" :class="{'__visible': isElementsVisible[1]}">Спортивние мероприятие</li>
              <li style="--animation-index: 2" :class="{'__visible': isElementsVisible[1]}">Исследования нейроинтерфейсов</li>
              <li style="--animation-index: 3" :class="{'__visible': isElementsVisible[1]}">Соревнования пилотов дронов</li>
            </ul>
          </ViewPortWatcher>
        </div>
      </section>


      <section class="section numbers">
        <header class="title">Реализованные с нами проекты</header>

        <ViewPortWatcher on-ref="section-3-listing-1" v-model="isElementsVisible[2]" :bottom-offset="100" :top-offset="-200">
          <ul class="listing" ref="section-3-listing-1">
            <li style="--animation-index: 0" :class="{'__visible': isElementsVisible[2]}">Восстановление памятника</li>
            <li style="--animation-index: 1" :class="{'__visible': isElementsVisible[2]}">Спортивние мероприятие</li>
            <li style="--animation-index: 2" :class="{'__visible': isElementsVisible[2]}">Исследования нейроинтерфейсов</li>
            <li style="--animation-index: 3" :class="{'__visible': isElementsVisible[2]}">Соревнования пилотов дронов</li>
          </ul>
        </ViewPortWatcher>

        <button class="button-join">Хочу участвовать в проекте!</button>

        <ViewPortWatcher on-ref="section-3-listing-2" v-model="isElementsVisible[3]" :bottom-offset="100" :top-offset="-200">
          <ul class="listing-numbers" ref="section-3-listing-2">
            <li style="--animation-index: 0" :class="{'__visible': isElementsVisible[3]}"><div class="number">15</div> экспертов</li>
            <li style="--animation-index: 1" :class="{'__visible': isElementsVisible[3]}"><div class="number">800</div> проектов</li>
            <li style="--animation-index: 2" :class="{'__visible': isElementsVisible[3]}"><div class="number">2.5к</div> участников</li>
          </ul>
        </ViewPortWatcher>
      </section>

    </div>
    <Footer></Footer>
  </div>
</template>


<script>
import Footer from "~/components/Footer.vue";
import ViewPortWatcher from "~/components/ViewPortWatcher.vue";

export default {
  components: {ViewPortWatcher, Footer},

  data() {
    return {
      pageScroll: 0,

      isElementsVisible: {},

      // isStop: false,
    }
  },

  mounted() {
    // window.addEventListener('mousemove', this.onMouseMove);
    //
    // const updateMousePos = () => {
    //   this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
    //   this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;
    //   if (!this.isStop) {
    //     requestAnimationFrame(updateMousePos);
    //   }
    // };
    // updateMousePos();
  },

  // beforeUnmount() {
  //   this.isStop = true;
  // },

  unmounted() {
    // window.removeEventListener('mousemove', this.onMouseMove);
  },

  methods: {
    // onMouseMove(e) {
    //   this.targetMouseX = e.pageX;
    //   this.targetMouseY = e.pageY;
    // }
  }
}
</script>
