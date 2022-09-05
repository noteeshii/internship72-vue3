<template>
    <div class="container  mx-auto flex flex-col">
        <div class="flex justify-center items-center min-h-screen">
            <uiForm>
                <h1 class="text-2xl text-center mx-auto">Регистрация</h1>
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
                        Зарегистрироваться
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
        </div>
    </div>
</template>

<script>
import uiForm from "../Components/UI/ui-Form.vue";
import {useVuelidate} from '@vuelidate/core'
import {email, helpers, minLength, required, sameAs} from '@vuelidate/validators'
import {registerUser} from "../api/index";

export default {
    name: "Register",
    components: {
        uiForm,
    },
    setup: () => ({v$: useVuelidate()}),
    data() {
        return {
            role_id: 3,
            name: '',
            surname: '',
            city: '',
            email: '',
            password: '',
            password_confirmation: '',
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
    mounted() {
        if (this.session) {
            this.$router.push('/');
        }
    }
}
</script>
