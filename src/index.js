import { createApp } from 'vue'

import App from './App.vue'
// import WS from '@sergtyapkin/reconnecting-websocket'
import Storage from './Storage.js'
import createVueRouter from './Router.js'

import './styles/fontsLoader.styl';
import './styles/global.styl';
import ScrollRestore from "@sergtyapkin/scroll-restore";

const restoreScrollPagesNames = [
  'allProjects',
  'allFeeds',
];
const Router = createVueRouter(Storage, restoreScrollPagesNames);

const app = createApp(App)
  .use(Router)
  // .use(WS)
  .use(Storage)
  .use(ScrollRestore, Router, restoreScrollPagesNames, document.body)
  .mount('#app');
Storage.$app = app;
