<template>
  <div v-if="post && user">
    <h1 class="text-3xl">{{ post.title }}</h1>
    <div class="text-gray-500 mb-10">by {{ user.name }}</div>
    <div>{{ post.body }}</div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { watch } from 'vue';
import useResource from '../composables/useResource.js';

const props = defineProps({
  id: [String, Number], // coming from the router
});
const route = useRoute();

// post
const { item: post, fetchOne: fetchPost } = useResource('posts');
fetchPost(route.params.id);

// user
const { item: user, fetchOne: fetchUser } = useResource('users');
watch(
  () => ({ ...post.value }),
  () => fetchUser(post.value.userId),
);

// other approaches
// (async () => {
//   await fetchPost(props.id);
//   fetchUser(post.value.userId);
// })();

// fetchPost(props.id).then(() => {
//   fetchUser(post.value.userId);
// });
</script>
