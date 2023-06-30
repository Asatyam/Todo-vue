<script setup>
import axios from 'axios';

const projects = ref([]);
const name = ref('');

const props = defineProps(['current']);

const showForm = ref(false);

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


const handleSubmit = (e)=>{
    const body = {
        name: name.value,
    };
    showForm.value = false;

    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    }

    axios.post('http://localhost:4000/api/projects/',body, config)
    .then(res=>{
        console.log(res);
        projects.value = [...projects.value, res.data.newProject];
    }).catch(console.log);


}


</script>

<template>
    <div class="">
        
        <h2 class=" text-2xl p-2 text-center font-bold">PROJECTS</h2>
        <div class="grid grid-cols-1 grid-flow-row mt-3 pl-2 text-ellipsis ">
        <button class="text-start px-2  text-sm  border-black font-semibold  p-2 hover:bg-slate-200" @click="showForm = !showForm"> + New List</button>
        <Transition>
            <div v-if="showForm" class="my-2">
                <form @submit.prevent="handleSubmit">
                    <label for="name">Name</label>
                    <input v-model="name" required id="name" class=" block px-2 py-1 outline-none rounded  w-7/9 text-white bg-orange-600 text-sm"  />
                    <button type="submit"  class="ml-5 mt-2 border-red-300 border-2 px-2">Add</button>
                    <button class="ml-5 mt-2 border-red-300 border-2 px-2"  @click="showForm=false">Back</button>
                </form>
            </div>
        </Transition>
        <button @click="$emit('changeProject', project.id)" v-for="project in projects" key="project.id" class="text-start  p-2 mr-1 text-sm  border-black hover:bg-slate-200 focus:bg-slate-200" >
            {{project.name}}
            </button>
         
        </div>
    </div>
</template>
<style scoped>

.v-enter-active {
  transition: all 0.5s ease-out;
}

.v-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.v-enter-from,
.v-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>