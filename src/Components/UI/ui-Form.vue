<template>
    <div class="sm:w-2/3  lg:w-1/2 xl:w-1/3 min-h-[400px] bg-white p-5 lg:p-8 rounded-lg shadow-2xl border">
        <div>
            <router-link to="/">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 hover:text-pink-300" fill="none"
                     viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"/>
                </svg>
            </router-link>
        </div>
        <slot/>
    </div>
</template>

<script>
export default {
    name: "ui-Form"
}
</script>

<style scoped>

</style>
