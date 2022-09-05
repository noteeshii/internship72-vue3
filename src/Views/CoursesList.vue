<template>
    <div class="">
        <div class="w-full flex mb-5 justify-between items-center">
            <h1 class="text-lg">Ваши курсы</h1>
            <button class="btn-primary" @click="$router.push('courses/constructor')">Создать курс</button>
        </div>
        <div>
            <div v-for="course in courses" class="bg-gray-100 flex p-5 rounded-lg mb-2">
                <h2 class="text-xl w-1/3">{{ course.title }}</h2>
                <span class="w-1/3">
                    Этапов: {{ countStagesInCourse(course) }}
                </span>
                <span class="w-1/3">
                    Шагов: {{ countStepsInCourse(course) }}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import XSidebar from "../Components/UI/x-sidebar.vue";
import {fetchCourses} from "../api/index";

export default {
    name: "Courses",
    components: {XSidebar},
    data() {
        return {
            courses: {}
        }
    },
    methods: {
        fetchMentorCourses() {
            fetchCourses(
                data => {
                    this.courses = data
                }
            );
        },
        countStagesInCourse(course) {
            return course.stages.length;
        },
        countStepsInCourse(course) {
            let steps = 0;
            course.stages.forEach(stage => {
                steps += stage.steps.length;
            });
            return steps;
        },
    },
    created() {
        this.fetchMentorCourses()
    }
}
</script>

<style scoped>

</style>
