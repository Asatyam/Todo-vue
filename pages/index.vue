<script setup>


definePageMeta({
    middleware: 'auth'
})

const current = ref('');

const changeProject = (id)=>{
    current.value = id
}

</script>

<template>

    <main>

        <Header />
        <div class="grid relative grid-cols-[180px_1fr] ">

            <div class="sidebar  text-gray-900 font-light">
                <Sidebar :current="current" @change-project="changeProject"/>
            </div>
            <div class=" bg-teal-500">
                <Content :current = "current" />
            </div>
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