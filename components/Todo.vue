<script setup>

const props = defineProps(['todo']);

onMounted(()=>{
    console.log(props);
})
</script>

<template>

    <div class="text-xl">
        {{ props.todo.title }}
    </div>
</template>