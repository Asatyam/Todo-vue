<script setup>
import axios from 'axios';
const props = defineProps(['current']);

const todos = ref([]);

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
      console.log(res.data.todos);
      todos.value = res.data.todos;
      console.log(todos.value[0].title);
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
</script>

<template>
  <div class="p-3">

    <form @submit.prevent = "addNewTodo">
        <div class=" rounded grid grid-cols-[max-content_1fr_max-content_max-content] gap-4 bg-indigo-700 p-2 pl-8 pr-8  w- ml-auto mr-auto left-0 right-0 mb-6" >
                        <label for="newtodo"> + New Todo</label>
                        <input v-model="newTodo" id="newtodo" name="new" placeholder="Things to do " class="outline-none bg-indigo-500 pl-2 pr-2 rounded  text-white" />
                        <select v-model="priority" class="outline-none bg-indigo-500 pl-2 pr-2 rounded  text-white">
                            <option disabled value = "">Select Priority</option>
                            <option selected>High</option>
                            <option>Medium</option>
                            <option>Low</option>
                        </select>
                        <button type="submit" class="">Add</button>
        </div>
    </form>
        <Todo v-for="todo in todos" :key="todo.id" :todo="todo"/>

        
  </div>

</template>
