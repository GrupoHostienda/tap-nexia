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
        border-2 border-[#C58B8B]        
        bg-[#F0DFDF] p-4	
        hover:bg-white
    ">
        <i class="pi pi-trash"
           style="color: #C58B8B"
            ></i>
    </div>
</template>
