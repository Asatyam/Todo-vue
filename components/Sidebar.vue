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
        <h2 class=" text-2xl p-2 text-center">PROJECTS</h2>
        <div class="grid grid-cols-1 grid-flow-row ">
        <button v-for="project in projects" key="project.id">
            {{project.name}}
            </button>
        </div>
    </div>
</template>