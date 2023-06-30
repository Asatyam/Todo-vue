<script setup>
import axios from 'axios';

const props = defineProps(['current']);

const todos = ref([]);
const showOptions = ref(false);

const newTodo = ref('');
const priority = ref('High');



watchEffect(() => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  axios
    .get(`http://localhost:4000/api/projects/${props.current}`, config)
    .then((res) => {
      todos.value = res.data.todos;
    })
    .catch(console.log);
    
});

const addNewTodo = ()=>{
    console.log(newTodo.value, priority);
    const body = {
        title: newTodo.value,
        priority: priority.value,
    }
     const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    }
    axios.post(`http://localhost:4000/api/projects/${props.current}/todos`,body,  config)
        .then(res => {          
            console.log(res);
            todos.value = [res.data.result, ...todos.value];
            
        })
        .catch(console.log);
    newTodo.value = "";
}
function closeModal() {
  showOptions.value = false
}
</script>

<template>
  <div class="p-3">

    <form @submit.prevent = "addNewTodo">
        <div class=" rounded grid grid-cols-[max-content_1fr_max-content_max-content] gap-4 bg-indigo-700 p-2 pl-4 pr-4  ml-auto mr-auto left-0 right-0 mb-3" >
                        <label for="newtodo"> + New Todo</label>
                        <input v-model="newTodo" id="newtodo" name="new" placeholder="Things to do " class="outline-none bg-indigo-500 pl-2 pr-2 rounded  text-white" />
                        <select v-model="priority" class="outline-none bg-indigo-500 pl-2 pr-2 rounded  text-white">
                            <option disabled value = "">Select Priority</option>
                            <option selected>High</option>
                            <option>Medium</option>
                            <option>Low</option>
                        </select>
                        <button type="submit" class=" border-red-300 border-2 px-2">Add</button>
        </div>
    </form>
        <button class="w-6 h-6" @click="showOptions = !showOptions">
          <img src="/images/menu.png"  alt="menu"/>
          </button>
          <Transition>
            <div v-if="showOptions" class=" bg-white absolute top-21 left-50 text-black w-50">
              <button class="block border-slate-500 border-b-2 pr-3 pl-2 text-sm text-start py-1 w-full font-light hover:bg-blue-700 hover:text-white transition-colors">Sort by Due Date</button>
              <button class="block border-slate-500 border-b-2 pr-3 pl-2 text-sm text-start py-1 w-full font-light hover:bg-blue-700 hover:text-white transition-colors">Sort by Priority</button>
              <button class="block border-slate-500 border-b-2 pr-3 pl-2 text-sm text-start py-1 w-full font-light hover:bg-blue-700 hover:text-white transition-colors">Update Project Name</button>
              <button class="block border-slate-500 border-b-2 pr-3 pl-2 text-sm text-start py-1 w-full font-light hover:bg-blue-700 hover:text-white transition-colors">Delete Project</button>
            </div>
          </Transition>
        <Todo v-for="todo in todos" :key="todo.id" :todo="todo"/>

        
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
}</style>