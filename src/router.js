import {createRouter, createWebHistory} from '../node_modules/vue-router/dist/vue-router.esm-bundler'

import Register from "./Views/Register.vue";
import Index from "./Views/Index.vue";
import Mentors from "./Views/Mentors.vue";
import Login from "./Views/Login.vue";
import Blog from "./Views/Blog.vue";
import Profile from "./Views/Profile.vue";
import {currentUserSession} from "./api";
import store from "./store/store";
import MentorRegister from "./Views/MentorRegister.vue";
import Courses from "./Views/Courses.vue";
import CourseConstructor from "./Views/CourseConstructor.vue";
import CoursesList from "./Views/CoursesList.vue";
import ProfileSettings from "./Views/ProfileSettings.vue";

const authGuard = (to, from, next) => {
    currentUserSession(
        session => {
            if (session === 0) {
                store.commit('destroy');
                next('/login');
            }
            store.commit('refresh', session)
            next();
        },
    );
}

const routes = [
    {
        path: '/register',
        name: 'Регистрация',
        component: Register,
    },
    {
        path: '/become-mentor',
        name: 'Стать наставником',
        component: MentorRegister,
    },
    {
        path: '/login',
        name: 'Авторизация',
        component: Login,
    },
    {
        path: '/',
        name: 'Главная',
        component: Index,
    },
    {
        path: '/mentors',
        name: 'Наставники',
        component: Mentors,
    },
    {
        path: '/blog',
        name: 'Блог',
        component: Blog,
    },
    {
        path: '/profile',
        component: Profile,
        beforeEnter: authGuard,
        children: [
            {
                path: '',
                name: 'Профиль',
                component: ProfileSettings,
            },
            {
                path: '/courses',
                name: 'Курсы',
                component: Courses,
                children: [
                    {
                        path: '',
                        name: 'Список курсов',
                        component: CoursesList,
                    },
                    {
                        path: 'constructor',
                        name: 'Конструктор курсов',
                        component: CourseConstructor,
                    },
                ]
            }]
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    let title;
    if (to.name === 'Главная') {
        title = 'Стажировка72 - Стажировка для подростков в Тюмени и Новые кадры для бизнеса';
    } else {
        title = to.name + ' - ' + 'Стажировка72 - Стажировка для подростков в Тюмени и Новые кадры для бизнеса';
    }
    if (to.params.title) {
        title = to.params.title + ' - ' + title;
    }
    document.title = title

    next()
})


export default router
