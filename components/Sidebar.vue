<script setup>
import axios from 'axios';

const projects = ref([]);


onMounted(()=>{
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    }
    axios.get('http://localhost:4000/api/projects', config)
        .then(res => {
            projects.value = res.data.projects;
        })
        .catch(console.log);
}) 
</script>

<template>
    <div class="">
        <h2 class=" text-2xl p-2 text-center font-bold">PROJECTS</h2>
        <div class="grid grid-cols-1 grid-flow-row mt-3 pl-2 text-ellipsis ">
        <button @click="()=>{console.log(project.id)}" v-for="project in projects" key="project.id" class="text-start  p-2 mr-1 text-sm  border-black hover:bg-slate-200 " >
            {{project.name}}
            </button>
         <button class="text-start px-2  text-sm  border-black  absolute bottom-5 left-2 p-2 hover:bg-slate-200"> + New List</button>
        </div>
    </div>
</template>
<style scoped>


</style>