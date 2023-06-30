<script setup lang="ts">
import axios from 'axios';

definePageMeta({
  middleware: 'redirect',
});

const username = ref('');
const password = ref('');
const confirm = ref('');
const errors = ref([]);

const handleSubmit = (evt: Event) => {
  const body = {
    username: username.value,
    password: password.value,
    confirm: confirm.value,
  };
  axios
    .post('https://todo-api-58q4.onrender.com/api/signup', body)
    .then((res) => {
      console.log(res.data);
      localStorage.setItem('token', res.data.token);
    })
    .catch((err) => {
      errors.value = err.response.data.errors;
      console.log(errors.value[0]);
    });
};
</script>

<template>
  <main class="grid justify-center items-center h-[100vh] bg-slate-100">
    <div
      class="bg-white h-fit rounded-lg border-blue-300 border-2 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.6)]"
    >
      <form class="p-4 pb-2" @submit.prevent="handleSubmit">
        <label class="block font-medium text-md mt-4 mb-2 text-center"
          >Username<span class="text-red-900">*</span></label
        >
        <input
          v-model="username"
          type="text"
          name="username"
          required
          class="outline-none w-80 block px-3 py-1 bg-white border border-slate-300 invalid:border-red-100 invalid:border-2 invalid:text-pink-400 focus:invalid:border-pink-500"
        />
        <label class="block font-medium text-md mt-4 mb-2 text-center"
          >Password<span class="text-red-900">*</span></label
        >
        <input
          v-model="password"
          type="password"
          name="password"
          required
          minlength="8"
          class="outline-none w-80 block px-3 py-1 bg-white border border-slate-300 invalid:border-red-100 invalid:border-2 invalid:text-pink-400 focus:invalid:border-pink-500"
        />
        <label class="block font-medium text-md mt-4 mb-2 text-center"
          >Confirm Password<span class="text-red-900">*</span></label
        >
        <input
          v-model="confirm"
          type="password"
          name="confirm"
          required
          minlength="8"
          class="outline-none w-1000 w-80 block px-3 py-1 bg-white border border-slate-300 invalid:border-red-100 invalid:border-2 invalid:text-pink-400 focus:invalid:border-pink-500"
        />
        <button
          type="submit"
          class="block mt-5 bg-sky-900 font-medium hover:bg-teal-500 transition-2s w-5/6 py-2 text-white text-lg rounded-md content-center self-center m-auto trainsition ease-out duration-100"
        >
          Sign Up
        </button>
        <div
          class="errors text-center mt-2 text-red-700"
          v-if="errors.length > 0"
        >
          <li v-for="{ msg } in errors">
            {{ msg }}
          </li>
        </div>
      </form>
      <p class="text-center p-2 font-medium text-teal-700 text-lg">
        Already registered?
        <NuxtLink to="/login" class="text-blue-800 font-bold hover:underline">
          Login
        </NuxtLink>
      </p>
    </div>
  </main>
</template>
