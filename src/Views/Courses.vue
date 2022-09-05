<template>
    <!--    <div class="flex">-->
    <!--        <x-sidebar/>-->
    <!--        <div class="container mx-auto mt-12">-->
    <router-view/>
    <!--        </div>-->
    <!--    </div>-->
</template>

<script>
import XSidebar from "../Components/UI/x-sidebar.vue";

export default {
    name: "Courses",
    components: {XSidebar}

}
</script>

<style scoped>

</style>
