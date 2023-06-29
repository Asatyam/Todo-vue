<script setup>
import axios from 'axios';
const props = defineProps(['current']);

const todo = ref([]);

watchEffect(()=>{
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    }
    axios.get(`http://localhost:4000/api/projects/${props.current}`, config)
        .then(res => {
            console.log(res);
        })
        .catch(console.log);
})

</script>


<template>

<div>
    Hello
</div>
</template>