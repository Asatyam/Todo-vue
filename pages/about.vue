<script setup>
    
definePageMeta({
        middleware: 'auth'
})
</script>
<template>
    <div>
    This is about
    <NuxtLink to="/">Index</NuxtLink>
    </div>
</template>