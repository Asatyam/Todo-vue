<script setup>

import axios from 'axios';
const {todo} = defineProps(['todo']);

const color = ref('text-red-500');
if (todo.priority === 'High'){
    color.value = 'text-rose-300'; 
}
else if (todo.priority === 'Medium'){
    color.value = 'text-yellow-500';
}
else{
    color.value = 'text-green-500';
}

const checked = ref(todo.completed);
const showDetails = ref(false);
const showForm = ref(false);
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
// const showDetails = (e)=>{
//     details.value = details.value === '0'?'300':'0';
// }

</script>

<template>

    <div class=" border-b-2 border-b-slate-400 p-2 transition-all">
        <input @change="changeStatus" v-model="checked" type="checkbox" class=" appearance-none w-4 h-4 border-blue-900 border-2 rounded-lg bg-transparent checked:bg-green-300 transition-colors mr-2 ">
        <button  @click="showDetails = !showDetails" class= 'title text-xl inline' :class="color">{{ todo.title }}</button>
        <Transition>
            <div v-if="showDetails && !showForm">
                <p class="inline text-black ml-5">Description: <span class="text-white">{{ todo.description ? todo.description : 'No description yet' }}</span> </p>
                <p class="ml-5 text-black">Due Date: <span class="text-white">{{ todo.dueDate ? todo.dueDate : 'No Due Date' }}</span></p>
                <p class="ml-5 text-black">Priority: <span :class="color">{{ todo.priority }}</span> </p>
                <button class="ml-5 mt-2 border-red-300 border-2 px-2 ">Edit</button>
                <button class="ml-5 mt-2 border-red-300 border-2 px-2">Delete</button>
            </div>
        </Transition>
        <Transition>
            <div v-if="showForm">
                <p class="inline text-black ml-5">Description: <span class="text-white">{{ todo.description ? todo.description : 'No description yet' }}</span> </p>
                <p class="ml-5 text-black">Due Date: <span class="text-white">{{ todo.dueDate ? todo.dueDate : 'No Due Date' }}</span></p>
                <p class="ml-5 text-black">Priority: <span :class="color">{{ todo.priority }}</span> </p>
                <button class="ml-5 mt-2 border-red-300 border-2 px-2 ">Done</button>
            </div>
        </Transition>   
    </div>
</template>

<style scoped>

.v-enter-active {
  transition: all 0.5s ease-out;
}

.v-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.v-enter-from,
.v-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>