<script setup>
import { ref, onMounted } from 'vue';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import Dropdown from '@/Components/Dropdown.vue';
import DropdownLink from '@/Components/DropdownLink.vue';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink.vue';
import { Link } from '@inertiajs/vue3';

import Button from "primevue/button";

import { SidebarMenu } from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";

defineProps({
    height: {
        type: String,
        required: false,
    },
});

const numberOfAlerts = ref(JSON.parse(localStorage.getItem('alertCount') || '0'));

const menu = [
    {
        href: "/examples",
        title: "Ejemplo",
        icon: {
            element: 'span',
            class: 'pi pi-fw pi-map-marker',
        },
    },
];

const showingNavigationDropdown = ref(false);
const collapse = ref(JSON.parse(localStorage.getItem('collapse') || 'false'));


const onToggleCollapse = (collapsed) => {
    collapse.value = collapsed;
    localStorage.setItem('collapse', JSON.stringify(collapsed));
};

onMounted(() => {
    const collapseFromStorage = localStorage.getItem('collapse');
    if (collapseFromStorage) {
        collapse.value = JSON.parse(collapseFromStorage);
    }
});
</script>

<template>
    <div>
        <sidebar-menu
            :menu="menu"
            @update:collapsed="onToggleCollapse"
            :collapsed="collapse"
            :linkComponentName="Link"
            widthCollapsed="100px"
            class="!bg-pantone"
        >
            <template #header>
                <div class="flex justify-center h-16 w-full">
                    <div class="flex">
                        <!-- Logo -->
                        <div class="shrink-0 flex items-center">
                            <Link :href="route('examples')">
                                <ApplicationLogo
                                    class="block h-9 w-auto fill-current text-gray-800"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </template>

            <template #toggle-icon>
                <i
                    class="pi pi-fw pi-angle-double-left"
                    :class="{
                        'pi-angle-double-left': collapse,
                        'pi-angle-double-right': !collapse,
                    }"
                ></i>
            </template>
        </sidebar-menu>

        <div
            class="min-h-screen bg-fondo-primary transition"
            :class="{
                'pl-[100px]': collapse,
                'pl-[290px]': !collapse,
            }"
        >
            <nav class="bg-white border-b h-[8vh] border-gray-100">
                <!-- Primary Navigation Menu -->
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                    <div class="flex justify-between h-full py-3">
                        <div class="flex"></div>

                        <div class="hidden sm:flex sm:items-center sm:ml-6">
                            <!-- Settings Dropdown -->

                            <div class="ml-3 relative">
                                <Dropdown
                                    align="right"
                                    width="48"
                                    triggerClass="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
                                >
                                    <template #trigger>
                                        <Button class="!bg-black [&>span]:text-white" icon="pi pi-user" severity="danger" text raised rounded aria-label="User" />
                                    </template>

                                    <template #content>
                                        <!-- Account Management -->
                                        <div class="block px-4 py-2 text-xs text-gray-400">
                                            Manage Account
                                        </div>

                                        <DropdownLink
                                            :href="route('profile.edit')"
                                        >
                                            Profile
                                        </DropdownLink>

                                        <DropdownLink
                                            :href="route('logout')"
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </DropdownLink>
                                    </template>
                                </Dropdown>

                        </div>
                        </div>

                        <!-- Hamburger -->
                        <div class="-mr-2 flex items-center sm:hidden">
                            <button
                                @click="
                                    showingNavigationDropdown =
                                        !showingNavigationDropdown
                                "
                                class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg
                                    class="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        :class="{
                                            hidden: showingNavigationDropdown,
                                            'inline-flex':
                                                !showingNavigationDropdown,
                                        }"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        :class="{
                                            hidden: !showingNavigationDropdown,
                                            'inline-flex':
                                                showingNavigationDropdown,
                                        }"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Responsive Navigation Menu -->
                <div
                    :class="{
                        block: showingNavigationDropdown,
                        hidden: !showingNavigationDropdown,
                    }"
                    class="sm:hidden"
                >
                    <div class="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            :href="route('examples')"
                            :active="route().current('examples')"
                        >
                            examples
                        </ResponsiveNavLink>
                    </div>

                    <!-- Responsive Settings Options -->
                    <div class="pt-4 pb-1 border-t border-gray-200">
                        <div class="px-4">
                            <div class="font-medium text-base text-gray-800">
                                <!-- {{ $page.props.auth.user.name }} -->
                            </div>
                            <div class="font-medium text-sm text-gray-500">
                                <!-- {{ $page.props.auth.user.email }} -->
                            </div>
                        </div>

                        <div class="mt-3 space-y-1">
                            <ResponsiveNavLink :href="route('profile.edit')">
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                :href="route('logout')"
                                method="post"
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            <!-- Page Content -->
            <main :class="
                {
                    'h-[92vh]': !height,
                    'h-full': height,
                }
            ">
                <slot />
            </main>
        </div>
    </div>
</template>
