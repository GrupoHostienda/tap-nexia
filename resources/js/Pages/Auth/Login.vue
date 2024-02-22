<script setup>
import { Head, Link, useForm } from "@inertiajs/vue3";
import { ref } from "vue";

import InputError from "@/Components/InputError.vue";

// Prime Vue
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";

defineProps({
    canResetPassword: {
        type: Boolean,
    },
    status: {
        type: String,
    },
});

const form = useForm({
    email: "",
    password: "",
    remember: false,
});

const submit = () => {
    form.post(route("login"), {
        onFinish: () => form.reset("password"),
    });
};
</script>

<template>
    <Head title="Welcome" />

    <div class="h-screen grid place-items-center bg-[#F5ECEB]">
        <img
            alt="Image"
            class="bg-login absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-[0.1] w-full h-full object-cover z-0"
        />

        <div
            class="surface-card p-4 shadow-2 border-round w-full max-w-xl relative z-10"
        >
            <div class="text-center mb-5">
                <img
                    alt="Image"
                    height="50"
                    class="bg-login-logo mb-3 mx-auto"
                />
                <div class="text-900 text-3xl font-medium mb-3">
                    Bienvenidos a la red seguridad
                </div>
                <span class="text-600 font-medium line-height-3">¿No tienes una cuenta?</span>
                <Link
                    :href="route('register')"
                    class="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
                >
                    Crear una
                </Link>
            </div>

            <form @submit.prevent="submit">
                <div>
                    <label for="email" class="block text-900 font-medium mb-2"
                        >Email</label
                    >

                    <InputText
                        id="email"
                        type="email"
                        class="w-full mb-3 styles-input"
                        v-model="form.email"
                        required
                        autofocus
                        autocomplete="username"
                    />

                    <InputError class="mt-2" :message="form.errors.email" />
                </div>

                <div>
                    <label
                        for="password"
                        class="block text-900 font-medium mb-2"
                        >Contraseña</label
                    >
                    <InputText
                        id="password"
                        type="password"
                        class="w-full mb-3 styles-input"
                        v-model="form.password"
                        required
                        autocomplete="current-password"
                    />

                    <InputError class="mt-2" :message="form.errors.password" />
                </div>

                <div class="flex align-items-center justify-between mb-6">
                    <div class="flex align-items-center">
                        <Checkbox
                            id="remember"
                            name="remember"
                            :binary="true"
                            v-model="form.remember"
                            class="mr-2"
                        ></Checkbox>
                        <label for="remember">Recordarme</label>
                    </div>

                    <Link
                        :href="route('password.request')"
                        class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
                    >
                        ¿Has olvidado tu contraseña?
                    </Link>
                </div>

                <Button
                    type="submit"
                    label="Iniciar sesión"
                    icon="pi pi-user"
                    class="w-full styles-btn"
                ></Button>
            </form>
        </div>
    </div>
</template>
