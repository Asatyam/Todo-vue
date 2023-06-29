<script setup>

import axios from 'axios';
const {todo} = defineProps(['todo']);

const checked = ref(false);
const changeStatus = (e)=>{
     const body = {
        title: todo.title,
        priority: todo.priority,
        completed: checked.value,
    }
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    }
    axios.put(`http://localhost:4000/api/projects/:projectid/todos/${todo.id}`, body, config)
    .then(res=>{
        console.log(res);
    })
    .catch(console.log);
}

</script>

<template>

    <div class="text-xl border-b-2 border-b-slate-400 p-2 ">
        <input @change="changeStatus" v-model="checked" type="checkbox" class=" appearance-none w-4 h-4 border-blue-900 border-2 rounded-lg bg-transparent checked:bg-green-300 transition-colors mr-2 ">
        <p class="inline">{{todo.title }}</p>
    </div>
</template>