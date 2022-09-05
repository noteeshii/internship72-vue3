<template>
    <header v-if="$route.name != 'Регистрация' && $route.name != 'Авторизация' && $route.name != 'Стать наставником'"
            class="fixed top-0 w-full ">
        <div class="container px-5 mx-auto flex justify-between items-center">
            <h1 class="text-2xl sm:text-3xl ">Стажировка <span class="text-[#E3006D]">72</span></h1>
            <ul class="hidden lg:flex gap-x-[45px]">
                <li class="">
                    <router-link
                        :class="{'text-[#E3006D] underline underline-offset-4': $route.name == 'Главная' }"
                        class="hover:text-[#E3006D] hover:underline hover:underline-offset-4"
                        to="/">Главная
                    </router-link>
                </li>
                <li class="">
                    <router-link
                        :class="{'text-[#E3006D] underline underline-offset-4': $route.name == 'Блог' }"
                        class="hover:text-[#E3006D] hover:underline hover:underline-offset-4"
                        :to="{ name:'Блог' }">Блог
                    </router-link>
                </li>
                <li class="">
                    <router-link
                        :class="{'text-[#E3006D] underline underline-offset-4': $route.name == 'Наставники' }"
                        class="hover:text-[#E3006D] hover:underline hover:underline-offset-4"
                        :to="{ name:'Наставники' }">Найти наставника
                    </router-link>
                </li>
                <template v-if="!activeSession">
                    <li>
                        <router-link
                            :class="{'text-[#E3006D] underline underline-offset-4': $route.name == 'Авторизация' }"
                            class="hover:text-[#E3006D] hover:underline hover:underline-offset-4"
                            to="/login"> Войти
                        </router-link>
                    </li>
                    <li>
                        <router-link
                            :class="{'text-[#E3006D] underline underline-offset-4': $route.name == 'Регистрация' }"
                            class="hover:text-[#E3006D] hover:underline hover:underline-offset-4"
                            to="/register"> Регистрация
                        </router-link>
                    </li>
                    <li>
                        <router-link
                            :class="{'text-[#E3006D] underline underline-offset-4': $route.name == 'Стать наставником' }"
                            class="hover:text-[#E3006D] hover:underline hover:underline-offset-4"
                            to="/become-mentor"> Стать наставником
                        </router-link>
                    </li>
                </template>
                <template v-if="activeSession">
                    <li>
                        <router-link
                            :class="{'text-[#E3006D] underline underline-offset-4': $route.name == 'Профиль' }"
                            class="hover:text-[#E3006D] hover:underline hover:underline-offset-4"
                            to="/profile">
                            Профиль
                        </router-link>
                    </li>
                    <li>
                        <button
                            class="hover:text-[#E3006D] hover:underline hover:underline-offset-4"
                            @click.prevent="logout()">
                            Выйти
                        </button>
                    </li>
                </template>

            </ul>
            <Menu as="div" class="relative inline-block lg:hidden text-left">
                <div>
                    <MenuButton
                        class="inline-flex w-full justify-center  px-4 py-2 text-sm font-medium text-black hover:text-pink-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h8m-8 6h16"/>
                        </svg>
                    </MenuButton>
                </div>
                <transition
                    enter-active-class="transition duration-100 ease-out"
                    enter-from-class="transform scale-95 opacity-0"
                    enter-to-class="transform scale-100 opacity-100"
                    leave-active-class="transition duration-75 ease-in"
                    leave-from-class="transform scale-100 opacity-100"
                    leave-to-class="transform scale-95 opacity-0"
                >
                    <MenuItems
                        class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                        <div class="px-1 py-1">
                            <MenuItem v-slot="{ active }">
                                <router-link
                                    to="/"
                                    :class="[
                                      $route.name == 'Главная' ? 'bg-pink-500 text-white' : 'text-gray-900',
                                      'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                    ]">
                                    Главная
                                </router-link>
                            </MenuItem>
                            <MenuItem v-slot="{ active }">
                                <router-link
                                    :to="{ name:'Блог' }"
                                    :class="[
                                      $route.name == 'Блог' ? 'bg-pink-500 text-white' : 'text-gray-900',
                                      'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                    ]">
                                    Блог
                                </router-link>
                            </MenuItem>
                            <MenuItem v-slot="{ active }">
                                <router-link
                                    to="/mentors"
                                    :class="[
                                      $route.name == 'Наставники' ? 'bg-pink-500 text-white' : 'text-gray-900',
                                      'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                    ]">
                                    Найти наставника
                                </router-link>
                            </MenuItem>
                        </div>
                        <div v-if="activeSession" class="px-1 py-1">
                            <MenuItem v-slot="{ active }">
                                <router-link
                                    to="/profile"
                                    :class="[
                                      $route.name == 'Профиль' ? 'bg-pink-500 text-white' : 'text-gray-900',
                                      'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                    ]">
                                    Профиль
                                </router-link>
                            </MenuItem>
                            <MenuItem v-slot="{ active }">
                                <button
                                    @click="logout()"
                                    class="text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm">
                                    Выйти
                                </button>
                            </MenuItem>
                        </div>

                        <div v-if="!activeSession" class="px-1 py-1">
                            <MenuItem v-slot="{ active }">
                                <router-link
                                    to="/login"
                                    :class="[
                                      $route.name == 'Войти' ? 'bg-pink-500 text-white' : 'text-gray-900',
                                      'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                    ]">
                                    Войти
                                </router-link>
                            </MenuItem>
                            <MenuItem v-slot="{ active }">
                                <router-link
                                    to="/register"
                                    :class="[
                                      $route.name == 'Регистрация' ? 'bg-pink-500 text-white' : 'text-gray-900',
                                      'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                    ]">
                                    Зарегистрироваться
                                </router-link>
                            </MenuItem>
                            <MenuItem v-slot="{ active }">
                                <router-link
                                    to="/become-mentor"
                                    :class="[
                                      $route.name == 'Стать наставником' ? 'bg-pink-500 text-white' : 'text-gray-900',
                                      'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                    ]">
                                    Стать наставником
                                </router-link>
                            </MenuItem>
                        </div>
                    </MenuItems>
                </transition>
            </Menu>
        </div>
    </header>
</template>

<script>
import axios from "axios";
import {Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/vue'
import {ChevronDownIcon} from '@heroicons/vue/solid'

export default {
    name: "x-header",
    components: {
        Menu, MenuButton, MenuItems, MenuItem, ChevronDownIcon
    },
    methods: {
        logout() {
            axios.post('/s/logout').then(r => {
                if (r.data === 1) {
                    this.destroySession()
                }
            })
        },
        destroySession() {
            localStorage.removeItem('session')
            this.$store.commit('destroy')
            this.$router.push('/login')
        },
    },
    computed: {
        activeSession() {
            return this.$store.state.authUser
        }
    },
}
</script>
