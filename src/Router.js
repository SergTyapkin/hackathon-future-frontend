import { createRouter, createWebHistory } from 'vue-router'

import Registration from "~/views/User/Registration.vue";
import Login from "~/views/User/Login.vue";
import Profile from "~/views/User/Profile.vue";
import ChangePassword from "~/views/User/ChangePassword.vue";
import Page404 from "~/views/Page404.vue";
import RestorePassword from "~/views/User/RestorePassword.vue";
import PageLanding from "~/views/PageLanding.vue";
import PageMainWorkspace from "~/views/PageMainWorkspace.vue";
import PageAllProjects from "~/views/PageAllProjects.vue";
import PageAllFeeds from "~/views/PageAllFeeds.vue";
import PageAllGosPrograms from "~/views/PageAllGosPrograms.vue";
import PageProject from "~/views/PageProject.vue";
import {nextTick} from "vue";
import {scrollSmoothly, scrollSmoothlyStop} from "~/utils/utils";

export default function createVueRouter(Store, scrollToTopDenyHrefs=[]) {
    const routes = [
        {path: '/', name: 'default', component: Page404},
        {path: '/landing', name: 'landing', component: PageLanding},

        {path: '/register', name: 'register', component: Registration, meta: {noLoginRequired: true}},
        {path: '/login', name: 'login', component: Login, meta: {noLoginRequired: true}},
        {path: '/profile', name: 'profile', component: Profile, meta: {loginRequired: true}},

        {path: '/main', name: 'main', component: PageMainWorkspace, meta: {loginRequired: true}},
        {path: '/projects', name: 'allProjects', component: PageAllProjects},
        {path: '/feeds', name: 'allFeeds', component: PageAllFeeds},
        {path: '/gos-programs', name: 'gosPrograms', component: PageAllGosPrograms},
        {path: '/project/:id', name: 'project', component: PageProject, meta: {loginRequired: true}},
        {path: '/project/create', name: 'createProject', component: PageProject, meta: {loginRequired: true}},

        {path: '/:pathMatch(.*)*', name: 'page404', component: Page404},
    ];

    const Router = createRouter({
        history: createWebHistory(),
        routes: routes,
    });

    let router_got_user = false;
    Router.beforeEach(async (to, from, next) => {
        if (!router_got_user) {
            await Store.dispatch('GET_USER');
            router_got_user = true;
        }

        const notLoginedRedirect = {
            name: 'login'
        }
        const loginedRedirect = {
            name: 'profile',
        }
        const mainPageLogined = {
            name: 'main',
        }
        const mainPageNotLogined = {
            name: 'landing',
        }

        if (to.path === '/' || to.path === '') {
            if (Store.state.user.isSignedIn) {
                next(mainPageLogined);
                return;
            }
            next(mainPageNotLogined);
            return;
        }

        // Login required redirects
        if (to.matched.some(record => record.meta.loginRequired === true)) {
            if (Store.state.user.isSignedIn) {
                next();
                return;
            }
            next(notLoginedRedirect);
            return;
        } else if (to.matched.some(record => record.meta.noLoginRequired === true)) {
            if (!Store.state.user.isSignedIn) {
                next();
                return;
            }
            next(loginedRedirect);
            return;
        }
        next();
    });

    Router.getRegExpForPage = (pageName) => {
        return RegExp(Router.resolve(pageName).fullPath);
    };
    Router.afterEach(async (to, from, next) => {
        const inDenyList = scrollToTopDenyHrefs.reduce((sum, cur) => sum || Router.getRegExpForPage(cur).test(to.fullPath), false);
        if (!inDenyList || (from.name === to.name)) {
            await nextTick();
            scrollSmoothly(document.body, 0);
        } else {
            scrollSmoothlyStop();
        }
    });


    Router.beforeResolve(async (to) => {
        if (window?.onbeforeunload) {
            if (confirm("Изменения не сохранены. Вы уверены, что хотите покинуть страницу?"))
                window.onbeforeunload = null;
            else
                return false;
        }
    });

    return Router;
}
