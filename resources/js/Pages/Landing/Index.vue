<script setup>
import { Head } from "@inertiajs/vue3";
import { ref } from "vue";
import Button from "primevue/button";

defineProps({ user: Object });
</script>
<template>
    <Head title="Test" />
    <div class="flex flex-col gap-4">
        <div  class="flex justify-center">
        <img
            src="https://ams3.digitaloceanspaces.com/graffica/2022/12/Adidas-Logo-1971-1024x576.jpeg"
            class="w-[3rem] h-[3rem] rounded-full border-2 "
            alt="logo"
        />
        </div>
        <Button label="item1" severity="success" />
        <Button label="item2" severity="danger" />
    </div>
</template>
