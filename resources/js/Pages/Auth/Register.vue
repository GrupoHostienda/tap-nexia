<script setup>
import GuestLayout from '@/Layouts/GuestLayout.vue';
import InputError from '@/Components/InputError.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

import Button from "primevue/button"
import InputText from "primevue/inputtext"

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

const submit = () => {
    form.post(route('register'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
};
</script>

<template>
    <GuestLayout>
        <Head title="Register" />

        <form @submit.prevent="submit">
            <div>
                <label for="name" class="block text-900 font-medium mb-2">Nombre</label>

                <InputText
                    id="name"
                    type="text"
                    class="w-full mb-3 styles-input"
                    v-model="form.name"
                    required
                    autofocus
                    autocomplete="name"
                />

                <InputError class="mt-2" :message="form.errors.name" />
            </div>

            <div class="mt-4">
                <label for="email" class="block text-900 font-medium mb-2">Email</label>

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

            <div class="mt-4">
                <label for="password" class="block text-900 font-medium mb-2">Contraseña</label>

                <InputText
                    id="password"
                    type="password"
                    class="w-full mb-3 styles-input"
                    v-model="form.password"
                    required
                    autocomplete="new-password"
                />

                <InputError class="mt-2" :message="form.errors.password" />
            </div>

            <div class="mt-4">
                <label for="password_confirmation" class="block text-900 font-medium mb-2">Confirmar Contraseña</label>

                <InputText
                    id="password_confirmation"
                    type="password"
                    class="w-full mb-3 styles-input"
                    v-model="form.password_confirmation"
                    required
                    autocomplete="new-password"
                />

                <InputError class="mt-2" :message="form.errors.password_confirmation" />
            </div>

            <div class="flex items-center justify-between mt-4">
                <Link
                    :href="route('login')"
                    class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  ¿Ya estas registrado?
                </Link>

                <Button type="submit" label="Registrarse" icon="pi pi-user-plus" class=" styles-btn"></Button>
            </div>
        </form>
    </GuestLayout>
</template>
