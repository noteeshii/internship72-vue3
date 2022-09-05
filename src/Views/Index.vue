<template>
    <div class="pic bg-cover bg-repeat-space bg-top mt-14">
        <div class="container mx-auto relative top-[60px]">
            <div class="min-h-screen w-full md:w-3/4">
                <h1 class="text-3xl text-center my-8 py-8">Стажировка для подростков - Новые кадры для бизнеса</h1>
                <div class="flex flex-wrap px-2 justify-center">
                    <custom-select v-model:selectedForm="selectedForm" v-model:selectedDirection="selectedDirection"
                                   :forms="this.forms" :directions="this.directions"></custom-select>
                    <button
                        class="drop-shadow-lg btn-primary w-full xs:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 rounded-full md:rounded-l-none md:rounded-r-full"
                        @click="searchMentors()">
                        Найти наставника
                    </button>
                </div>
            </div>
            <div class="min-h-screen mb-20 w-full content-center">
                <h2 class="text-2xl py-8 mx-20">Направления</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 justify-items-center">
                    <div v-for="(card,indx) in cards" :key="indx" class="card-direction">
                        <strong class="text-xl w-full">{{ card.name }}</strong>
                        <div class="w-full">
                            <small class="text-slate-600">
                                {{ card.description }}
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {Listbox, ListboxButton, ListboxOption, ListboxOptions} from "@headlessui/vue";
import {CheckIcon, SelectorIcon} from "@heroicons/vue/solid";
import CustomSelect from "../Components/customSelect.vue";
import axios from "axios";
import {fetchAllDirections, fetchAllForms} from "../api/index";


export default {
    name: "Index.vue",
    components: {
        CustomSelect,
        List_box: Listbox,
        List_boxButton: ListboxButton,
        List_boxOptions: ListboxOptions,
        List_boxOption: ListboxOption,
        CheckIcon,
        SelectorIcon,
    },
    data() {
        return {
            selectedForm: "Формат",
            selectedDirection: "Направление",
            query: '',
            forms: [],
            directions: [],
            cards: [
                {name: 'Дизайн', description: 'Подойдет тем кто хочет погрузиться в творчество'},
                {name: 'SMM', description: 'Маркетинг в социальных сетях'},
                {name: 'Frontend-Разработка', description: 'Создание интерактивных сайтов и веб-приложений'},
                {name: 'Data Science', description: 'Обработка и анализ больших данных'},
                {name: 'AI', description: 'Создание ИИ с помощью машинного обучения и построения нейронных сетей'},
                {name: 'Backend-Разработка', description: 'Создание серверной части приложения'},
            ],
            course: {
                "mentor_id": 1,
                "theme_id": 1,
                "title": "awd",
                "stages": [
                    {
                        "id": 1662231246486,
                        "title": "<p>awd</p>",
                        "steps": [{"id": 1662231257703, "title": "<p>awdawd</p>", "body": "<p>awdawdaaa</p>"}]
                    },
                    {
                        "id": 1662231250666,
                        "title": "<p>wda</p>",
                        "steps": [
                            {
                                "id": 1662231261445,
                                "title": "<p>sssss</p>",
                                "body": "<p>ssssssss</p>"
                            },
                            {
                                "id": 1662231266251, "title": "<p>ffffff</p>", "body": "<p>fffffffff</p>"
                            }]
                    }, {"id": 1662231253935, "title": "<p>123</p>", "steps": []}]
            },
            c_data: {}
        }
    },
    methods: {
        async fetchForms() {
            await fetchAllForms(forms => {
                    this.forms = forms;
                }
            );
        },
        async fetchDirections() {
            await fetchAllDirections(directions => {
                    this.directions = directions;
                }
            );
        },
        searchMentors() {
            this.$router.push({
                name: 'Наставники',
                params: {form: this.selectedForm, direction: this.selectedDirection}
            })
        }
    },
    mounted() {
        this.fetchForms()
        this.fetchDirections()
        // axios.post('/s/courses/store', {'course': this.course}).then(res => console.log(res))
        axios.get('/s/courses/6').then(res => this.c_data = res.data.data)
        this.c_data.title = 'dawdawawdaw'
    }
}
</script>

<style scoped>
.pic {
    background-image: url("../assets/index-back.svg");
}
</style>
