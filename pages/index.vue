<script setup>

definePageMeta({
    middleware: 'auth'
})
</script>

<template>

    <main>
        <Header />
        <div class="grid grid-cols-[200px_1fr]">
            <div class="bg-green-400">
                <Sidebar/>
            </div>
            <div class="bg-red-500"></div>
        </div>
    </main>
</template>

<style scoped>
main{
    height: 100vh;

    display: grid;
    grid-template-rows: 70px 1fr;
}

</style>