<script setup>
import { RouterLink } from "vue-router";
defineProps({ Location: Object });
</script>

<template>
  <div v-if="Location" class="bg-white rounded-xl shadow-md p-4">
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-lg font-bold">{{ Location.name }}</h3>
      <span class="text-xl">🗺️</span>
    </div>
    <p class="text-gray-600 text-sm mb-4 line-clamp-3">
      {{ Location.description }}
    </p>
    <div class="border border-gray-100 mb-4"></div>
    <RouterLink
      :to="'/locations/' + Location.id"
      class="inline-block bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm"
    >
      View Location
    </RouterLink>
  </div>
</template>
