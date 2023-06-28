<script setup>
definePageMeta({
  pageTransition: {
    name: 'rotate'
  }
})

</script>


<template>
  <NuxtPage/>
  
</template>

<style>
*{
  margin: 0;
  padding: 0;
}
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
body{
  min-height: 100vh;
  width: 100%;
}
</style>