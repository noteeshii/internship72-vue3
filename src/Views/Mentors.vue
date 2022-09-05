<template>
    <div class="custom-back">
        <div class="container mx-auto min-h-screen mt-16">
            <div class="flex my-20 flex-wrap px-2 justify-center">
                <custom-select v-model:selectedForm="selectedForm"
                               v-model:selectedDirection="selectedDirection"
                               :forms="this.forms" :directions="this.directions"/>
                <button
                    class="drop-shadow-lg btn-primary w-full xs:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 rounded-full md:rounded-l-none md:rounded-r-full"
                    @click="searchMentors">
                    Найти наставника
                </button>
            </div>
            <div v-if="!loading"
                 class="p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-5 justify-items-center">
                <IndexMentorCard @like="like_handle" v-for="mentor in filteredMentors" :key="mentor.id" :mentor="mentor"
                                 v-model:has_like="mentor.like_from_current_user"/>
            </div>
            <div v-if="loading" class="bg-pink-100 p-2 mx-auto  rounded-full w-min">
                <svg class="animate-spin h-12 w-12 text-pink-300" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                    <path class="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
import IndexMentorCard from "../Components/IndexMentorCard.vue";
import {fetchAllDirections, fetchAllForms, fetchAllMentors, likeDelete, likeStore} from "../api/index";
import {Listbox, ListboxButton, ListboxOption, ListboxOptions} from "@headlessui/vue";
import {CheckIcon, SelectorIcon} from "@heroicons/vue/solid";
import CustomSelect from "../Components/customSelect.vue";

export default {
    name: "Mentors",
    components: {
        CustomSelect,
        IndexMentorCard,
        List_box: Listbox,
        List_boxButton: ListboxButton,
        List_boxOptions: ListboxOptions,
        List_boxOption: ListboxOption,
        CheckIcon,
        SelectorIcon
    },
    data() {
        return {
            mentors: [],
            filteredMentors: [],
            forms: [],
            directions: [],
            loading: true,
            selectedForm: "Формат",
            selectedDirection: "Направление",
        }
    },
    methods: {
        like_handle(event) {
            if (!this.authUser) {
                this.$router.push('/login');
                return;
            }
            if (event.likeToggle === true) {
                likeStore({user_id: this.authUser.id, mentor_id: event.mentorId});
            }
            if (event.likeToggle === false) {
                likeDelete({user_id: this.authUser.id, mentor_id: event.mentorId});
            }
            this.mentors.find(m => {
                if (m.id === event.mentorId) {
                    m.like_from_current_user = event.likeToggle
                    event.likeToggle === true ? m.likes++ : m.likes--;
                }
            })
        },
        async fetchMentors() {
            this.loading = true
            await fetchAllMentors(mentors => {
                this.mentors = mentors;
                this.filteredMentors = this.formFilter;
                this.loading = false;
            });
        },
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
        async searchMentors() {
            this.filteredMentors = this.formFilter;
        },
        getParams() {
            let params = this.$router.currentRoute._value.params
            this.selectedForm = params.form ?? "Формат"
            this.selectedDirection = params.direction ?? "Направление"
        }
    },
    computed: {
        authUser() {
            return this.$store.state.authUser
        },
        directionFilter() {
            if (this.selectedDirection !== "Направление") {
                return this.mentors.filter(mentor => mentor.direction.includes(this.selectedDirection))
            } else {
                return this.mentors
            }
        },
        formFilter() {
            if (this.selectedForm !== "Формат") {
                return this.directionFilter.filter(mentor => mentor.form.includes(this.selectedForm))
            } else {
                return this.directionFilter
            }
        },
    },
    created() {
        this.fetchMentors()
        this.fetchForms()
        this.fetchDirections()
    },
    mounted() {
        this.getParams()
        this.searchMentors()
    }

}
</script>

<style scoped>
.custom-back {
    background: url("../assets/mentors-back.svg") repeat-y;
    background-size: auto;
    background-position: top;
}
</style>
