<script setup>


definePageMeta({
    middleware: 'auth'
})
const sidebar = ref(false);
</script>

<template>

    <main>

        <Header />
        <div class="grid relative grid-cols-[180px_1fr] ">

            <div class="sidebar bg-sky-200 text-gray-900 font-light">
                <Sidebar/>
            </div>
            <div class=" bg-teal-500"></div>
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