<template>
    <div class="min-h-screen p-2">
        <div class="flex justify-between p-2 items-center">
            <div class="w-1/4">
                <strong>Название курса: </strong>
                <textarea
                    class="mt-1 custom-input block w-full rounded-lg resize-none overflow-hidden shadow-sm sm:text-sm  "
                    v-model="course.title" placeholder="Введите название курса"></textarea>
            </div>
            <button class="btn-primary" @click="saveCourse">Сохранить</button>
        </div>
        <div v-for="(stage,stageKey) in course.stages" class="border-2 border-gray-200 rounded-lg mb-5">
            <div class="mb-5 flex justify-between items-center bg-gray-200 p-2">
                <div class="w-1/3 table">
                    <strong>{{ stageKey + 1 }} - Название раздела: </strong>
                    <textarea
                        class="mt-1 custom-input block w-full rounded-lg resize-none overflow-hidden shadow-sm sm:text-sm  "
                        v-model="stage.title" placeholder="Введите название раздела"></textarea>
                </div>
                <div class="w-1/7">
                    <button
                        class="border-2 px-4 rounded-full border-red-800 text-red-800 hover:bg-red-500 hover:text-white"
                        @click="deleteStage(stageKey)">
                        Удалить
                        раздел
                    </button>
                </div>
            </div>
            <div class="px-12">
                <div v-for="(step,stepKey) in stage.steps" class="mb-5 border border-gray-200 rounded-lg p-2">
                    <div class="mb-5 flex justify-between items-center">
                        <div class="w-1/3 table">
                            <strong> {{ stageKey + 1 }}.{{ stepKey + 1 }} - Название шага: </strong>
                            <textarea
                                class="mt-1 custom-input block w-full rounded-lg resize-none overflow-hidden shadow-sm sm:text-sm  "
                                v-model="step.title" placeholder="Введите название шага"></textarea>
                        </div>
                        <div class="w-1/7">
                            <button
                                class="border-2 px-4 rounded-full border-red-800 text-red-800 hover:bg-red-500 hover:text-white"
                                @click="deleteStep(stageKey,stepKey)">
                                Удалить шаг
                            </button>
                        </div>
                    </div>
                    <div class="mb-5">
                        <QuillEditor v-model:content="step.body" toolbar="essential" placeholder="Тело шага"
                                     content-type="html"/>
                    </div>
                </div>
            </div>

            <div class="text-center mb-2">
                <button class="btn-primary bg-white text-pink-600 hover:text-white focus:text-white"
                        @click="createStep(stage)">
                    Добавить
                    шаг
                </button>
            </div>
        </div>
        <div class="text-center">
            <button class="btn-primary" @click="createStage">Добавить раздел
            </button>
        </div>
    </div>
</template>

<script>
import {QuillEditor} from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import XSidebar from "../Components/UI/x-sidebar.vue";
import {createCourse} from "../api/index";

export default {
    name: "CourseConstructor",
    components: {
        QuillEditor, XSidebar
    },
    data() {
        return {
            content: '',
            isOpenModal: false,
            course: {
                mentor_id: 1,
                theme_id: 1,
                title: '',
                stages: [
                    // {
                    //   id: 1,
                    //   title: '',
                    //   steps: [
                    //     {
                    //       id: 1,
                    //       title: '',
                    //       body: '',
                    //       type: 1,
                    //     }
                    //   ],
                    // }
                ]
            }
        }
    },
    methods: {
        saveCourse() {
            createCourse({course: this.course}, res => {
                this.$router.push('/courses');
            });
        },
        deleteStep(stageKey, stepKey) {
            this.course.stages[stageKey].steps.splice(stepKey, 1);
        },
        deleteStage(stageKey) {
            this.course.stages.splice(stageKey, 1);
        },
        createStage() {
            const stage = {
                id: Date.now(),
                title: '',
                steps: []
            }
            this.course.stages.push(stage);
        },
        createStep(stage) {
            const step = {
                id: Date.now(),
                title: '',
                body: ''
            }
            const activeStage = this.course.stages.find(s => s.id == stage.id)
            activeStage.steps.push(step);
        }
    }
}
</script>
