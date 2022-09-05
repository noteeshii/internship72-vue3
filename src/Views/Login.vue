<template>
    <div class="container  mx-auto flex flex-col">
        <div class="flex justify-center items-center min-h-screen">
            <uiForm>
                <h1 class="text-2xl text-center mx-auto">Авторизация</h1>
                <div class="bg-red-100 border border-red-400 mt-3 p-2"
                     v-if="errors">
                    Неверный email или пароль
                </div>
                <div class="mx-auto my-4">
                    <span class="m-3">Email</span>
                    <input v-model="email" type="text"
                           class="custom-input"
                           :class="{'custom-input-invalid' :v$.email.$error}"
                           placeholder="Укажите ваш email"
                           @blur="v$.email.$touch">
                    <span class="text-red-400 m-3"
                          v-if="v$.email.$dirty && v$.email.required.$invalid">
                            {{ v$.email.required.$message }}
                        </span>
                    <span class="text-red-400 m-3"
                          v-if="v$.email.$dirty && v$.email.email.$invalid">
                            {{ v$.email.email.$message }}
                        </span>
                </div>
                <div class="mx-auto my-4">
                    <span class="m-3">Пароль</span>
                    <input v-model="password" type="password"
                           class="custom-input placeholder-shown:font-normal font-black"
                           :class="{'custom-input-invalid': v$.password.$error}"
                           placeholder="Укажите ваш пароль"
                           @blur="v$.password.$touch">
                    <span class="text-red-400 m-3"
                          v-if="v$.password.$dirty && v$.password.required.$invalid">
                            {{ v$.password.required.$message }}
                        </span>
                    <span class="text-red-400 m-3"
                          v-if="v$.password.$dirty && v$.password.minLength.$invalid">
                            {{ v$.password.minLength.$message }}
                        </span>
                </div>
                <label class="mx-auto my-4">
                    <span class="m-3">Запомнить меня</span>
                    <Switch
                        v-model="remember"
                        :class="remember ? 'bg-[#E3006D]' : 'bg-pink-200'"
                        class="border relative inline-flex h-6 w-11 items-center rounded-full">
                            <span
                                :class="remember ? 'translate-x-6' : 'translate-x-1'"
                                class="border inline-block h-4 w-4 transform rounded-full bg-white"/>
                    </Switch>
                </label>
                <div class="mt-6 mb-8 text-center">
                    <button
                        class="btn-primary"
                        @click.prevent="login()">
                        Войти
                    </button>
                </div>
                <div class="mx-auto pt-6 text-center sticky bottom-0">
                    Ещё нет учетной записи ?
                    <router-link
                        class="link-secondary"
                        to="/register">
                        Зарегистрироваться
                    </router-link>
                </div>
            </uiForm>
        </div>
    </div>
</template>

<script>
import uiForm from "../Components/UI/ui-Form.vue";
import {Switch} from "@headlessui/vue";
import {useVuelidate} from '@vuelidate/core'
import {email, helpers, minLength, required} from '@vuelidate/validators'
import {loginUser} from '../api'

export default {
    name: "Register",
    components: {
        uiForm, Switch
    },
    setup: () => ({v$: useVuelidate()}),
    data() {
        return {
            email: '',
            password: '',
            remember: false,
            errors: false
        }
    },
    validations() {
        return {
            email: {
                required: helpers.withMessage('Поле email не должно быть пустым', required),
                email: helpers.withMessage('Вы ввели некорректный email', email)
            },
            password: {
                required: helpers.withMessage('Поле пароль не должно быть пустым', required),
                minLength: helpers.withMessage('Минимальная длинна пароля 8 символов', minLength(8))
            }
        }
    },
    methods: {
        async login() {
            const isFormCorrect = await this.v$.$validate()
            if (!isFormCorrect) return
            const loginData = {
                email: this.email,
                password: this.password,
                remember: this.remember,
            }
            await loginUser(loginData,
                session => {
                    this.saveSession(session);
                    this.$router.push('/');
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
    },
    computed: {
        session() {
            return JSON.parse(localStorage.getItem('session'))
        }
    },
    created() {
        if (this.session) {
            this.$router.push('/');
        }
    }
}
</script>
