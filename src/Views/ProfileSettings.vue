<template>
    <!--    <div class="flex">-->
    <!--        <x-sidebar/>-->
    <!--        <div class="container mx-auto min-h-screen mt-12">-->
    <div class="md:grid md:grid-cols-4 md:gap-2">
        <div class="mt-5 md:mt-0 md:col-span-2">
            <div class="shadow overflow-hidden sm:rounded-md">
                <div class="px-4 py-5 bg-white sm:p-6">
                    <div class="grid grid-cols-6 gap-6">
                        <div class="col-span-6 sm:col-span-3">
                            <label for="first-name"
                                   class="block text-sm font-medium text-gray-700">
                                Имя
                            </label>
                            <input type="text" v-model="authUser.name" name="first-name"
                                   id="first-name"
                                   autocomplete="given-name"
                                   class="mt-1 custom-input block w-full shadow-sm sm:text-sm"/>
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="last-name" class="block text-sm font-medium text-gray-700">
                                Фамилия
                            </label>
                            <input type="text" v-model="authUser.surname" name="last-name"
                                   id="last-name" autocomplete="family-name"
                                   class="mt-1 custom-input block w-full shadow-sm sm:text-sm"/>
                        </div>
                        <div class="col-span-6 sm:col-span-4">
                            <label for="email-address"
                                   class="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input type="text" v-model="authUser.email" name="email-address"
                                   id="email-address" autocomplete="email"
                                   class="mt-1 custom-input block w-full shadow-sm sm:text-sm"/>
                        </div>
                        <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                            <label for="city"
                                   class="block text-sm font-medium text-gray-700">
                                Город
                            </label>
                            <input type="text" v-model="authUser.city" name="city" id="city"
                                   autocomplete="address-level2"
                                   class="mt-1 custom-input block w-full shadow-sm"/>
                        </div>
                    </div>
                </div>
                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                        class="inline-flex btn-primary justify-center py-2 px-4 shadow-sm text-sm font-medium"
                        @click.prevent="updateUserData">
                        Обновить
                    </button>
                </div>
            </div>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2 lg:col-span-1 col-start-1">
            <div class="shadow overflow-hidden sm:rounded-md">
                <div class="px-4 py-5 bg-white sm:p-6">
                    <div class="grid grid-cols-1 gap-6">
                        <div class="col-span-1">
                            <label class="block text-sm font-medium text-gray-700">Аватар</label>
                            <div class="mt-1 flex flex-wrap items-center">
                                        <span
                                            class="inline-block mb-5 h-40 w-40 mx-auto rounded-full overflow-hidden bg-center bg-cover"
                                            :style="backgroundImageInlineStyle"/>
                                <input type="file" ref="avatar"
                                       class="ml-5 custom-input bg-white py-2 px-3  shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none ring-1 ring-offset-2"
                                       @change="updateUserAvatar"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--                <div class="mt-5 md:mt-0 md:col-span-2 lg:col-span-1">-->
        <!--                    <div class="shadow overflow-hidden sm:rounded-md">-->
        <!--                        <div class="px-4 py-5 bg-white sm:p-6">-->
        <!--                            <div class="grid grid-cols-1 gap-6">-->
        <!--                                <div class="col-span-6 sm:col-span-3">-->
        <!--                                    <label for="first-name" class="block text-sm font-medium text-gray-700">-->
        <!--                                        Старый пароль-->
        <!--                                    </label>-->
        <!--                                    <input type="password" v-model="authUser.password" name="first-name"-->
        <!--                                           autocomplete="given-name"-->
        <!--                                           class="placeholder-shown:font-normal font-black mt-1 custom-input block w-full shadow-sm">-->
        <!--                                </div>-->

        <!--                                <div class="col-span-6 sm:col-span-3">-->
        <!--                                    <label for="last-name" class="block text-sm font-medium text-gray-700">-->
        <!--                                        Новый пароль-->
        <!--                                    </label>-->
        <!--                                    <input type="password" v-model="authUser.newpassword" name="last-name"-->
        <!--                                           autocomplete="family-name"-->
        <!--                                           class="placeholder-shown:font-normal font-black mt-1 custom-input block w-full shadow-sm">-->
        <!--                                </div>-->

        <!--                                <div class="col-span-6 sm:col-span-3">-->
        <!--                                    <label for="last-name" class=" block text-sm font-medium text-gray-700">-->
        <!--                                        Повторите новый пароль-->
        <!--                                    </label>-->
        <!--                                    <input type="password" v-model="authUser.newpassword_confirmation"-->
        <!--                                           name="last-name" autocomplete="family-name"-->
        <!--                                           class="placeholder-shown:font-normal font-black mt-1 custom-input block w-full shadow-sm">-->
        <!--                                </div>-->

        <!--                            </div>-->
        <!--                        </div>-->
        <!--                        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">-->
        <!--                            <button-->
        <!--                                class="inline-flex btn-primary justify-center py-2 px-4 shadow-sm text-sm font-medium">-->
        <!--                                Обновить-->
        <!--                            </button>-->
        <!--                        </div>-->
        <!--                    </div>-->
        <!--                </div>-->
        <div v-if="!activeSession.email_verified_at"
             class="mt-5 md:mt-0 md:col-start-2 md:col-span-2">
            <div class="shadow overflow-hidden sm:rounded-md">
                <div class="px-4 py-5 bg-white sm:p-6">
                    <div class="grid grid-cols-4 gap-y-6 gap-x-2">
                        <h1 class="col-start-1 col-span-4 text-2xl">
                            Подтвердите электронную почту, чтобы стать наставником
                        </h1>
                        <span v-if="alert"
                              class="bg-pink-100 col-span-4 p-3 rounded-lg">
                                            {{ alert }}
                                        </span>
                    </div>
                </div>
                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                        class="inline-flex btn-primary justify-center py-2 px-4 shadow-sm text-sm font-medium"
                        v-if="!alert" @click.prevent="resendEmail">Отправить письмо
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!--        </div>-->
    <!--    </div>-->
</template>

<script>
import {Tab, TabGroup, TabList, TabPanel, TabPanels} from '@headlessui/vue'
import IndexMentorCard from "../Components/IndexMentorCard.vue";
import xSelect from "../Components/xSelect.vue";
import {
    createMentorCard,
    createNewCompany,
    fetchMentorCreateData,
    fetchMentorsQueue,
    fetchUserProfile,
    resendEmailVerificationMessage,
    updateUserAvatar,
    updateUserData,
} from "../api/index";
import XSidebar from "../Components/UI/x-sidebar.vue";

export default {
    name: "Profile",
    components: {
        XSidebar,
        IndexMentorCard,
        TabGroup,
        TabList,
        Tab,
        TabPanels,
        TabPanel,
        xSelect
    },
    data() {
        return {
            authUser: [],
            mentors: [],
            directions: [],
            companies: [],
            forms: [],
            groupSize: 1,
            alert: '',
            info: '',
            selectedForm: {
                name: 'Выберите формат',
                id: 0
            },
            selectedCompany: {
                name: 'Укажите компанию в которой вы работаете',
                id: 0
            },
            selectedDirection: {
                name: 'Выберите навправление',
                id: 0
            },
            customCompany: '',
        }
    },
    methods: {
        async updateUserData() {
            const userData = {
                id: this.authUser.id,
                name: this.authUser.name,
                surname: this.authUser.surname,
                email: this.authUser.email,
                city: this.authUser.city,
            }
            await updateUserData(userData,
                response => {
                    this.authUser = response
                }
            );
        },
        async updateUserAvatar() {
            const avatar = this.$refs.avatar.files[0]
            let formData = new FormData();
            formData.append('avatar', avatar);
            await updateUserAvatar(formData, session => {
                this.authUser.avatar = session.avatar;
                this.$store.commit('refresh', session);
            });
        },
        async resendEmail() {
            await resendEmailVerificationMessage(message => this.alert = message);
        },
        async createNewCompany() {
            if (this.customCompany) {
                await createNewCompany(this.customCompany,
                    newCompany => {
                        this.companies.push(newCompany);
                        this.selectedCompany = newCompany;
                        this.customCompany = '';
                    },
                    company => {
                        this.selectedCompany = this.companies
                            .find(c => c.name === company);
                        this.customCompany = '';
                    });
            }
        },
        async createMentorCard() {
            const mentorCardData = {
                user_id: this.authUser.id,
                group_size: this.groupSize,
                info: this.info,
                form_id: this.selectedForm.id,
                company_id: this.selectedCompany.id,
                direction_id: this.selectedDirection.id,
            }
            await createMentorCard(mentorCardData,
                cb => {
                    this.$store.commit('changeRole', cb.user.role.id);
                    this.$router.push('/mentors');
                },
                ecb => {
                    console.log(ecb);
                });
        },
        async fetchProfile() {
            await fetchUserProfile(
                userProfileData => this.authUser = userProfileData
            );
        },
        async fetchMentorsQueue() {
            await fetchMentorsQueue(
                mentorsList => this.mentors = mentorsList
            );
        },
        async fetchMentorCreate() {
            await fetchMentorCreateData(mentorCreateData => {
                this.forms = mentorCreateData.forms;
                this.directions = mentorCreateData.directions;
                this.companies = mentorCreateData.companies;
            });
        }
    },
    computed: {
        backgroundImageInlineStyle() {
            return `background: url("${this.authUser.avatar}") no-repeat; background-size: cover; background-position: center;`;
        },
        activeSession() {
            return this.$store.state.authUser
        },
        accessToCreateCard() {
            if (this.activeSession.email_verified_at && this.activeSession.role_id !== 2) {
                return true;
            } else if (this.activeSession.email_verified_at && this.activeSession.role_id === 2) {
                return false;
            } else if (!this.activeSession.email_verified_at || this.activeSession.role_id === 2) {
                return false;
            }
        },
        accessToViewCard() {
            if (this.activeSession.email_verified_at && this.activeSession.role === 2) {
                return true;
            } else if (!this.activeSession.email_verified_at || this.activeSession.role !== 2) {
                return false;
            }
        }
    },
    created() {
        // currentUserSession(
        //     session => {
        //         if (session === 0) {
        //             this.$store.commit('destroy');
        //             this.$router.push('/login');
        //         }
        //     }
        // );
        this.fetchProfile()
        this.fetchMentorsQueue()
        this.fetchMentorCreate()
    }
}
</script>
