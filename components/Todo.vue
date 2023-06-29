<script setup>
import axios from 'axios';
const { todo } = defineProps(['todo']);
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const color = ref('text-red-500');
if (todo.priority === 'High') {
  color.value = 'text-rose-300';
} else if (todo.priority === 'Medium') {
  color.value = 'text-yellow-500';
} else {
  color.value = 'text-green-500';
}

const checked = ref(todo.completed);
const showDetails = ref(false);
const showForm = ref(false);

const title = ref(todo.title);
const description =ref(todo.description);
const dueDate = ref(todo.dueDate);
const priority = ref(todo.priority);


const changeStatus = (e) => {
  const body = {
    title: todo.title,
    priority: todo.priority,
    completed: checked.value,
  };
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  axios
    .put(
      `http://localhost:4000/api/projects/:projectid/todos/${todo.id}`,
      body,
      config
    )
    .then((res) => {
      console.log(res);
    })
    .catch(console.log);
};
const handleSubmit = (e)=>{
    const body = {
        title:title.value,
        description:description.value,
        dueDate : dueDate.value,
        priority : priority.value,
    }
    const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  axios
    .put(
      `http://localhost:4000/api/projects/:projectid/todos/${todo.id}`,
      body,
      config
    )
    .then((res) => {
      console.log(res);
      showForm.value = false
    })
    .catch(console.log);
}
const handleReset = (e)=>{
    title.value = todo.title;
    description = todo.description;
    dueDate = todo.dueDate;
    priority = todo.priority;
}
</script>

<template>
  <div class="border-b-2 border-b-slate-400 p-2 transition-all">
    <input
      @change="changeStatus"
      v-model="checked"
      type="checkbox"
      class="appearance-none w-4 h-4 border-blue-900 border-2 rounded-lg bg-transparent checked:bg-green-300 transition-colors mr-2"
    />
    <button
      @click="showDetails = !showDetails"
      class="title text-xl inline"
      :class="color"
    >
      {{ title }}
    </button>
    <Transition>
      <div v-if="showDetails && !showForm">
        <p class="inline text-black ml-5">
          Description:
          <span class="text-white">{{
            description ? description : 'No description yet'
          }}</span>
        </p>
        <p class="ml-5 text-black">
          Due Date:
          <span class="text-white">{{
            dueDate ? dueDate : 'No Due Date'
          }}</span>
        </p>
        <p class="ml-5 text-black">
          Priority: <span :class="color">{{ priority }}</span>
        </p>
        <button
          @click="showForm = true"
          class="ml-5 mt-2 border-red-300 border-2 px-2"
        >
          Edit
        </button>
        <button class="ml-5 mt-2 border-red-300 border-2 px-2">Delete</button>
      </div>
    </Transition>

    <Transition name="form">
      <div v-if="showForm && showDetails">
        <form @submit.prevent="handleSubmit">
            <div class="ml-5 mt-2">
            <label for="title" class="">Title</label>
            <input
              v-model="title"
              id="title"
              class="mt-1 ml-5 px-2 py-1 w-96 bg-indigo-400  outline-none "
            />
          </div>
          <div class="ml-5 mt-2">
            <label for="description" class="">Description</label>
            <textarea
              v-model="description"
              id="description"
              cols="50"
              class="block mt-1 bg-indigo-400 resize-x outline-none p-2"
            ></textarea>
          </div>
          <div class="ml-5 mt-2">
            <label for="dueDate">Due Date</label>
            <input
              v-model="dueDate"
              id="dueDate"
              type="date"
              class="outline-none ml-5 bg-transparent"
            />
          </div>
          <div class="ml-5 mt-2">
            <label for="priority">Priority</label>
            <select
              id="priority"
              v-model="priority"
              class="outline-none bg-indigo-500 ml-8 rounded text-white"
            >
              <option disabled value="">Select Priority</option>
              <option selected>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
          <button
            @click="showForm = false"
            class="ml-5 mt-2 border-red-300 border-2 px-2"
          >
            Back
          </button>
          <button @click="handleReset" class="ml-5 mt-2 border-red-300 border-2 px-2">Reset</button>
          <button type="submit" class="ml-5 mt-2 border-red-300 border-2 px-2">
            Done
          </button>
        </form>
      </div>
    </Transition>
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
.form-enter-active {
  transition: all 0.8s ease-out;
}

.form-leave-active {
  transition: all 0.6s cubic-bezier(1, 0.5, 0.8, 1);
}

.form-enter-from,
.form-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
