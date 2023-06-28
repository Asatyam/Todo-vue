<script setup>
import {NuxtLink} from '#components';
</script>

<template>
    <main class="grid justify-center items-center h-[100vh] bg-slate-100">
        <div class=" bg-white h-fit rounded-lg border-blue-300 border-2 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.6)]">
            <form class="p-5">
                <label class="block font-medium text-md mt-4 mb-2 text-center">Username</label>
                <input type="text" name="username" required
                    class=" outline-none w-80  block  px-3 py-1  bg-white border border-slate-300 invalid:border-red-100 invalid:border-2 invalid:text-pink-400 focus:invalid:border-pink-500" />
                <label class="block font-medium text-md mt-4 mb-2 text-center">Password</label>
                <input type="password" name="password" required
                    class=" outline-none w-80 block  px-3 py-1  bg-white border border-slate-300 invalid:border-red-100 invalid:border-2 invalid:text-pink-400 focus:invalid:border-pink-500" />
                <label class="block font-medium text-md mt-4 mb-2 text-center">Confirm Password</label>
                <input type="password" name="confirm" required
                    class="outline-none w-1000 w-80 block  px-3 py-1  bg-white border border-slate-300 invalid:border-red-100 invalid:border-2 invalid:text-pink-400 focus:invalid:border-pink-500" />
                <button type="submit"
                    class="block mt-5 bg-sky-900 font-medium hover:bg-teal-500  transition-2s w-5/6 py-2 text-white text-lg rounded-md content-center self-center m-auto trainsition ease-out duration-100">
                    Sign Up
                </button>
            </form>
            <p class="text-center p-2 font-medium text-teal-700 text-lg">Already registered?
                <NuxtLink to="/login" class="text-blue-800 font-bold hover:underline">
                    Login
                </NuxtLink>
            </p>
        </div>
    </main>
</template>