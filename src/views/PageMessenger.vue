<style scoped lang="stylus">
@require '../styles/constants.styl'
@require '../styles/buttons.styl'
@require '../styles/fonts.styl'
@require '../styles/utils.styl'
@require '../styles/components.styl'
@require '../styles/animations.styl'
@require '../styles/scrollbars.styl'


topStringHeight = 80px
.root-page-messenger
  paddingTop = 80px
  padding-top paddingTop
  .root-messenger
    display flex
    width 100vw
    height 'calc(100vh - %s)' % (headerHeight + paddingTop)
    border-bottom 1px solid colorEmp21
    //background mix(red, white)

    .right-column
    .left-column
      display flex
      flex-direction column
      .top-string
        block-emp-2(0, 5px)
        padding 10px
        height topStringHeight
        border-radius 0
    .left-column
      min-width 200px
      width 30vw
      .top-string
        border-top-left-radius borderRadiusXL
        .search
          margin 10px
          height calc(100% - 20px)
          input()

      .chats-list
        flex 1
        box-shadow 3px 0 3px #00000010
        overflow-y auto
        scrollable()

        .chat
          height 80px
          border-bottom 2px solid colorEmp21
          hover-effect-opacity()
          padding 10px
          trans()
          &.selected
            border-left 8px solid colorEmp16
            padding-left 2px
            background mix(colorEmp21, white, 20%)
          .name
            svg-inside()
            .avatar
              display inline-block
              border-radius 99999px
              border 1px solid colorEmp21
              margin-right 10px
              size = 55px
              width size
              height size

    .right-column
      flex 1
      .top-string
        border-top-right-radius borderRadiusXL
      .chat
        box-shadow 0 1px 3px #00000050
</style>

<template>
  <div class="root-page-messenger">
    <div class="root-messenger">
      <div class="left-column">
        <div class="top-string">
          <input class="search" @input="updateSearch" v-model="searchText">
        </div>
        <div class="chats-list">
          <div v-for="chat in showedChats" class="chat" @click="selectChat(chat)" :class="{selected: selectedChat === chat}">
            <header class="name"><img :src="chat.userAvatar" alt="avatar" class="avatar">{{ chat.userName }}</header>
          </div>
        </div>
      </div>

      <div class="right-column">
        <div class="top-string"></div>
        <div class="chat"></div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  components: {},

  data() {
    return {
      allChats: [],
      showedChats: [],

      searchText: '',

      selectedChat: undefined,
    }
  },

  async mounted() {
    await this.getChats();
    this.updateSearch();
  },

  methods: {
    async getChats() {
      this.loading = true;
      const {data, ok} = await this.$api.getAllMyChats();
      this.loading = false;

      if (!ok) {
        this.$popups.error('Ошибка', 'Не удалось получить список чатов');
        return;
      }

      this.allChats = data.chats;
    },

    updateSearch() {
      this.showedChats = this.allChats.filter(chat => {
        return new RegExp(this.searchText).test(chat.title);
      });
    },

    selectChat(chat) {
      this.selectedChat = chat;
    }
  }
}
</script>
