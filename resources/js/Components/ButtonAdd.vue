<script setup>
defineProps({
    value: {
        type: String,
        require:false
    },
});
</script>

<template>
    <div class="
        flex justify-center 
        rounded-full 
        border-2 border-slate-300
        bg-slate-200 p-4	
        hover:bg-slate-100
    ">
        <i class="pi pi-plus"></i>
    </div>
</template>
