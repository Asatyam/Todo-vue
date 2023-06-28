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
    <div>
        
    </div>
</template>