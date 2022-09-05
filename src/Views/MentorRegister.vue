<template>
    <div class="container  mx-auto flex flex-col">
        <div class="flex justify-center items-center min-h-screen">
            <uiForm v-if="currentStage">
                <h1 class="text-2xl text-center mx-auto">Стать наставником</h1>
                <div class="bg-red-100 border border-red-400 mt-3 p-2" v-if="errors">Возникла ошибка, возможно этот
                    email уже занят
                </div>
                <div class="mx-auto my-4">
                    <span class="m-3">Имя</span>
                    <input v-model="name" type="text"
                           class="custom-input"
                           :class="{'custom-input-invalid' :v$.name.$error}"
                           placeholder="Ваше имя"
                           @blur="v$.name.$touch"
                    >
                    <span class="text-red-400 m-3"
                          v-if="v$.name.$dirty && v$.name.required.$invalid">
                                        {{ v$.name.required.$message }}
                                    </span>
                </div>
                <div class="mx-auto my-4">
                    <span class="m-3">Фамилия</span>
                    <input v-model="surname" type="text"
                           class="custom-input"
                           :class="{'custom-input-invalid' :v$.surname.$error}"
                           placeholder="Ваша фамилия"
                           @blur="v$.surname.$touch"
                    >
                    <span class="text-red-400 m-3"
                          v-if="v$.surname.$dirty && v$.surname.required.$invalid">
                                        {{ v$.surname.required.$message }}
                                    </span>
                </div>
                <div class="mx-auto my-4">
                    <span class="m-3">Город</span>
                    <input v-model="city" type="text"
                           class="custom-input"
                           :class="{'custom-input-invalid' :v$.city.$error}"
                           placeholder="Укажите город"
                           @blur="v$.city.$touch"
                    >
                    <span class="text-red-400 m-3"
                          v-if="v$.city.$dirty && v$.city.required.$invalid">
                                        {{ v$.city.required.$message }}
                                    </span>
                </div>
                <div class="mx-auto my-4">
                    <span class="m-3">Email</span>
                    <input v-model="email" type="email"
                           class="custom-input"
                           :class="{'custom-input-invalid' :v$.email.$error}"
                           placeholder="Укажите ваш email"
                           @blur="v$.email.$touch"
                    >
                    <span class="text-red-400 m-3"
                          v-if="v$.email.$dirty && v$.email.required.$invalid"> {{ v$.email.required.$message }} </span><br>
                    <span class="text-red-400 m-3"
                          v-if="v$.email.$dirty && v$.email.email.$invalid"> {{ v$.email.email.$message }} </span>
                </div>
                <div class="mx-auto my-4">
                    <span class="m-3">Пароль</span>
                    <input v-model="password" type="password"
                           class="placeholder-shown:font-normal font-black custom-input"
                           :class="{'custom-input-invalid' :v$.password.$error}"
                           placeholder="Придумайте пароль"
                           @blur="v$.password.$touch"
                    >
                    <span class="text-red-400 m-3"
                          v-if="v$.password.$dirty && v$.password.required.$invalid">
                                        {{ v$.password.required.$message }}
                                    </span><br>
                    <span class="text-red-400 m-3"
                          v-if="v$.password.$dirty && v$.password.minLength.$invalid">
                                        {{ v$.password.minLength.$message }}
                                    </span>
                </div>
                <div class="mx-auto my-4">
                    <span class="m-3">Потверждение пароля</span>
                    <input v-model="password_confirmation" type="password"
                           class="placeholder-shown:font-normal font-black custom-input"
                           :class="{'custom-input-invalid' :v$.password_confirmation.$error}"
                           placeholder="Повторите пароль"
                           @blur="v$.password_confirmation.$touch"
                    >
                    <span class="text-red-400 m-3"
                          v-if="v$.password_confirmation.$dirty && v$.password_confirmation.required.$invalid">
                                        {{ v$.password_confirmation.required.$message }}
                                    </span><br>
                    <span class="text-red-400 m-3"
                          v-if="v$.password_confirmation.$dirty && v$.password_confirmation.sameAs.$invalid">
                                        {{ v$.password_confirmation.sameAs.$message }}
                                    </span>
                </div>
                <div class="mt-6 mb-8 text-center">
                    <button
                        class="btn-primary"
                        @click.prevent="register()">
                        Далее
                    </button>
                </div>
                <div class="mx-auto pt-6 text-center sticky bottom-0">
                    Уже есть учетная запись ?
                    <router-link
                        class="link-secondary"
                        to="/login">
                        Войти
                    </router-link>
                </div>
            </uiForm>
            <uiForm v-if="!currentStage">
                <div class="overflow-hidden sm:rounded-md">
                    <div class="px-4 py-5 bg-white sm:p-6">
                        <div class="grid grid-cols-8 gap-y-6 gap-x-2">
                            <h1 class="col-start-2 col-span-6 text-2xl">Стать наставником</h1>
                            <div class="col-span-8">
                                <label for="email-address"
                                       class="block text-sm font-medium text-gray-700">Направление</label>
                                <x-select v-model:selected="selectedDirection"
                                          :options="directions"></x-select>
                            </div>

                            <div class="col-span-8 lg:col-span-6">
                                <label for="email-address"
                                       class="block text-sm font-medium text-gray-700">Формат</label>
                                <x-select v-model:selected="selectedForm" :options="forms"></x-select>
                            </div>
                            <div class="col-span-3 lg:col-span-2">
                                <label for="email-address"
                                       class="block whitespace-nowrap text-sm font-medium text-gray-700">
                                    Размер группы
                                </label>
                                <input type="number" v-model="group_size" name="email-address"
                                       autocomplete="email" min="1"
                                       class="shadow-lg custom-input ring-pink-200 py-3 pl-3 block text-center w-full shadow-sm sm:text-sm  ">
                            </div>
                            <div class="col-span-8">
                                <label for="email-address"
                                       class="block text-sm font-medium text-gray-700">Компания</label>
                                <x-select v-model:selected="selectedCompany" :slot="true"
                                          :options="companies">
                                    <input
                                        placeholder="Заполните поле и нажмите галочку справа если тут нет вашей компании"
                                        v-model="customCompany"
                                        type="text"
                                        class="custom-input">
                                    <button class="px-5" @click.prevent="createNewCompany">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             class="h-6 w-6 text-pink-300 hover:text-pink-600" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                  d="M5 13l4 4L19 7"/>
                                        </svg>
                                    </button>
                                </x-select>
                            </div>
                            <div class="col-span-8">
                                <label for="first-name"
                                       class="block text-sm font-medium text-gray-700">Информация</label>
                                <textarea v-model="info"
                                          class="mt-1 custom-input block w-full rounded-lg overflow-hidden shadow-sm sm:text-sm  "
                                          placeholder="Расскажите о себе и своем опыте работы"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="px-4 py-3 text-right sm:px-6">
                        <button
                            class="inline-flex btn-primary justify-center py-2 px-4 shadow-sm text-sm font-medium"
                            @click.prevent="createMentorCard">Сохранить
                        </button>
                    </div>
                </div>
            </uiForm>
        </div>
    </div>
</template>

<script>
import xSelect from "../Components/xSelect.vue";
import uiForm from "../Components/UI/ui-Form.vue";
import {useVuelidate} from '@vuelidate/core'
import {email, helpers, minLength, required, sameAs} from '@vuelidate/validators'
import {createMentorCard, createNewCompany, fetchMentorCreateData, registerUser} from "../api/index";

export default {
    name: "Register",
    components: {
        uiForm,
        xSelect
    },
    setup: () => ({v$: useVuelidate()}),
    data() {
        return {
            stage: 1,
            role_id: 2,
            name: '',
            surname: '',
            city: '',
            email: '',
            password: '',
            password_confirmation: '',
            group_size: 1,
            info: '',
            customCompany: '',
            directions: [],
            companies: [],
            forms: [],
            selectedForm: {name: 'Выберите формат'},
            selectedDirection: {name: 'Выберите направление'},
            selectedCompany: {name: 'Укажите компанию в которой вы работаете'},
            requiredText: 'Это поле должно быть заполнено',
            errors: false
        }
    },
    validations() {
        return {
            name: {required: helpers.withMessage(this.requiredText, required)},
            surname: {required: helpers.withMessage(this.requiredText, required)},
            city: {required: helpers.withMessage(this.requiredText, required)},
            email: {
                required: helpers.withMessage(this.requiredText, required),
                email: helpers.withMessage('Вы ввели некорректный email', email)
            },
            password: {
                required: helpers.withMessage(this.requiredText, required),
                minLength: helpers.withMessage('Минимальная длинна пароля 8 символов', minLength(8))
            },
            password_confirmation: {
                required: helpers.withMessage(this.requiredText, required),
                sameAs: helpers.withMessage('Пароли должны совпадать', sameAs(this.password))
            },
        }
    },
    methods: {
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
                user_id: this.session.id,
                group_size: this.group_size,
                info: this.info,
                form_id: this.selectedForm.id,
                company_id: this.selectedCompany.id,
                direction_id: this.selectedDirection.id,
            }
            await createMentorCard(mentorCardData,
                cb => {
                    this.$store.commit('changeRole', 2);
                    this.$router.push('/mentors');
                },
                ecb => {
                    console.log(ecb);
                });
        },
        async register() {
            const isFormCorrect = await this.v$.$validate()
            if (!isFormCorrect) return
            const registerData = {
                role_id: this.role_id,
                name: this.name,
                surname: this.surname,
                city: this.city,
                email: this.email,
                password: this.password,
                password_confirmation: this.password_confirmation
            }
            await registerUser(registerData,
                session => {
                    this.saveSession(session);
                    this.stage = 2;
                },
                error => {
                    this.errors = error
                }
            );
        },
        saveSession(userSession) {
            this.$store.commit('refresh', userSession)
            localStorage.setItem('session', JSON.stringify(userSession))
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
        session() {
            return this.$store.state.authUser
        },
        currentStage() {
            return this.stage === 1;
        }
    },
    created() {
        if (this.session) {
            this.$router.push('/');
        }
        this.fetchMentorCreate();
    }
}
</script>
