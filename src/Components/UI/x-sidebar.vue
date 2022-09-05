<template>
    <aside
        class="flex mt-9 flex-col bg-gray-50 border-r-2 min-h-screen border-pink-300 w-[200px] p-3 transition-all ease-out duration-[0.2s] z-50"
        :class="{'ml-[-200px] transition-all ease-out duration-[0.2s]': !isSidebarOpen}">
        <button class="fixed left-52 rounded-lg bg-pink-400 p-1 transition-all ease-out duration-[0.2s]"
                :class="{'ml-[-200px] transition-all ease-out duration-[0.2s]': !isSidebarOpen}"
                @click="sidebarToggler">
            <svg v-if="!isSidebarOpen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 stroke-width="1.5"
                 stroke="currentColor" class="w-6 h-6 text-white">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"/>
            </svg>
            <svg v-if="isSidebarOpen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"/>
            </svg>

        </button>
        <ul class="fixed">
            <li>
                <router-link
                    :class="{'text-[#E3006D] underline underline-offset-4': $route.name == 'Профиль' }"
                    class="text-lg flex hover:text-[#E3006D] hover:underline hover:underline-offset-4"
                    to="/profile">
                    Профиль
                </router-link>
            </li>
            <li>
                <router-link
                    :class="{'text-[#E3006D] underline underline-offset-4': $route.name == 'Курсы' }"
                    class="text-lg hover:text-[#E3006D] hover:underline hover:underline-offset-4"
                    to="/courses">Курсы
                </router-link>
            </li>
            <li>
                <router-link
                    :class="{'text-[#E3006D] underline underline-offset-4': $route.name == 'Посты' }"
                    class="text-lg hover:text-[#E3006D] hover:underline hover:underline-offset-4"
                    to="/">Посты
                </router-link>
            </li>
            <li>
                <router-link
                    :class="{'text-[#E3006D] underline underline-offset-4': $route.name == 'Настройки' }"
                    class="text-lg flex hover:text-[#E3006D] hover:underline hover:underline-offset-4"
                    to="/">
                    Настройки
                </router-link>
            </li>
        </ul>
    </aside>
</template>

<script>
export default {
    name: "x-sidebar",
    data() {
        return {
            isSidebarOpen: false
        }
    },
    methods: {
        sidebarToggler() {
            this.isSidebarOpen = !this.isSidebarOpen;
        }
    }
}
</script>
